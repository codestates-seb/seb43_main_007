import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { AxiosResponse } from "axios";
import logo from "../../assets/img/logo2.png";
import validFunction from "../../util/signinValidFunc";
import LoginModal from "./LoginModal";
import { loginPost } from "../../api/axios";
import { setMemberId } from "../../reducers/memberIdSlice";
import { setIsAdmin } from "../../reducers/isAdminSlice";
import { LoginTypes } from "./loginTypes";

type ResponseType = [string, AxiosResponse | number];
interface Props {
   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginForm({ setIsLoading }: Props) {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { state } = useLocation(); // 들어온 페이지 url
   const [, setCookie, removeCookie] = useCookies(["accessToken", "isAdmin"]);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginTypes>();
   const [isFailModalOpen, setIsFailModalOpen] = useState(false);
   const [failMessage, setFailMessage] = useState({
      text1: "",
      text2: "",
   });
   // 페이지 입장할 때 첫 input에 focus
   const inputRef = useRef<HTMLInputElement | null>(null);
   const { ref } = register("username");
   useEffect(() => {
      if (inputRef.current !== null) inputRef.current.focus();
   }, []);

   // 요청 성공/실패 확인 함수
   const isSuccessResponse = (
      res: ResponseType
   ): res is [string, AxiosResponse] => {
      if (res[0] === "성공") return true;
      return false;
   };

   const onSubmit: SubmitHandler<LoginTypes> = async (data) => {
      setIsLoading(true);
      const response: ResponseType = await loginPost(data);
      if (isSuccessResponse(response)) {
         //  memberId session storage에 저장(로그인 상태 변경)
         const newMemberId = Number(response[1]?.headers.memberid);
         dispatch(setMemberId(newMemberId));
         sessionStorage.setItem("memberId", JSON.stringify(newMemberId));

         // accessToken은 쿠키에 저장
         const accessToken = response[1]?.headers.authorization.split(" ")[1];
         setCookie("accessToken", accessToken);
         // 관리자인지 여부 쿠키에 저장
         const isAdmin = response[1]?.headers.role.slice(1, 6) === "ADMIN";
         dispatch(setIsAdmin(isAdmin));
         if (isAdmin) {
            setCookie("isAdmin", "true");
         } else {
            removeCookie("isAdmin");
         }
         // 들어온 페이지로 이동, state 없으면 홈으로 이동
         if (state) {
            navigate(state);
         } else {
            navigate("/");
         }
      } else if (response[1] === 401) {
         // 아이디 비번이 잘못됐을 때
         setFailMessage({
            text1: "로그인에 실패했습니다.",
            text2: "아이디와 비밀번호를 확인해주세요.",
         });
         setIsFailModalOpen(true);
      } else {
         // 서버와 통신이 원활하지 않을 때
         setFailMessage({
            text1: "서버와 통신이 원활하지 않습니다.",
            text2: "다시 시도해 주세요.",
         });
         setIsFailModalOpen(true);
      }
      setIsLoading(false);
   };

   const navToHome = () => {
      navigate("/");
   };

   return (
      <LoginFormContainer onSubmit={handleSubmit(onSubmit)}>
         <button onClick={navToHome} type="button" className="logo-container">
            <img className="logo" src={logo} alt="logo" />
         </button>
         <div className="input-box">
            <input
               placeholder="이메일"
               className="email-input"
               {...register("username", {
                  required: true,
                  validate: validFunction.validEmail,
               })}
               ref={(e) => {
                  ref(e);
                  inputRef.current = e;
               }}
            />
            {errors.username && (
               <span className="error-message">
                  이메일 형식으로 입력해주세요
               </span>
            )}
         </div>
         <div className="input-box">
            <input
               placeholder="비밀번호"
               type="password"
               className="password-input"
               {...register("password", {
                  required: true,
                  validate: validFunction.validPassword,
               })}
            />
            {errors.password && (
               <span className="error-message">8자 이상 입력해주세요</span>
            )}
         </div>
         <button type="submit" className="submit">
            L O G I N
         </button>
         <LoginModal
            isOpen={isFailModalOpen}
            setIsOpen={setIsFailModalOpen}
            message={failMessage}
         />
      </LoginFormContainer>
   );
}

export default LoginForm;

const LoginFormContainer = styled.form`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
   height: 35%;
   margin-bottom: 1%;
   .logo-container {
      position: absolute;
      width: 100px;
      height: 100px;
      top: -50px;
      left: 50%;
      transform: translate(-50%, 0);
      overflow: hidden;
      cursor: pointer;
      background-color: transparent;
      border: none;
      .logo {
         width: 200px;
         height: 200px;
         transform: translate(-29%, -27%);
      }
   }
   .input-box {
      width: 70%;
      height: 80px;
      .email-input,
      .password-input {
         width: 100%;
         height: 50px;
         font-size: var(--font-base);
         padding-left: 2%;
         margin-bottom: 5px;
         border: 0.5px solid var(--second-color3);
         border-radius: 5px;
      }
      .error-message {
         font-size: var(--font-small);
         color: red;
      }
   }
   .submit {
      width: 70%;
      height: 50px;
      font-size: var(--font-large);
      color: white;
      cursor: pointer;
      background-color: var(--second-color3);
      border: 2px outset var(--second-color3);
      border-radius: 5px;
      transition-duration: 0.2s;
      &:hover {
         background-color: var(--third-color3);
         border-color: var(--third-color3);
         transition-duration: 0.2s;
      }
   }
`;
