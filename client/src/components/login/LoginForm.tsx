import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useRef } from "react";
import logo from "../../assets/img/logo2.png";
import validFunction from "../../util/signinValidFunc";

interface LoginTypes {
   email: string;
   password: string;
}

function LoginForm() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginTypes>();

   // 페이지 입장할 때 첫 input에 focus
   const inputRef = useRef<HTMLInputElement | null>(null);
   const { ref } = register("email");
   useEffect(() => {
      if (inputRef.current !== null) inputRef.current.focus();
   }, []);

   const onSubmit: SubmitHandler<LoginTypes> = (data) => {
      // 로그인 요청 함수 자리
      // 로그인시 home화면으로 navigate
      // 로그인 실패시 modal창으로 로그인실패 에러 메시지 띄우기
      console.log(data);
   };

   return (
      <LoginFormContainer onSubmit={handleSubmit(onSubmit)}>
         <img className="logo" src={logo} alt="logo" />
         <div className="input-box">
            <input
               placeholder="이메일"
               className="email-input"
               {...register("email", {
                  required: true,
                  validate: validFunction.validEmail,
               })}
               ref={(e) => {
                  ref(e);
                  inputRef.current = e;
               }}
            />
            {errors.email && (
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
            LOGIN
         </button>
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
   .logo {
      position: absolute;
      width: 200px;
      height: 200px;
      top: -100px;
      left: 50%;
      transform: translate(-50%, 0);
   }
   .input-box {
      width: 70%;
      height: 70px;
      .email-input,
      .password-input {
         width: 100%;
         height: 40px;
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
      height: 40px;
      font-size: var(--font-base);
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
