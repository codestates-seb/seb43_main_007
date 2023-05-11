import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import SignupInput from "./SignupInput";
import { SignupTypes } from "./SignupTypes";
import SignupQuestion from "./SignupQuestion";
import SignupOauth from "./SignupOauth";
import validFunc from "../../util/signinValidFunc";
import logo from "../../assets/img/logo2.png";
import { SignupPost } from "../../api/axios";

interface InputContents {
   labelName: string;
   contents: keyof SignupTypes;
   errorMessage: string;
   validFunction: (v: string) => boolean;
}

function SignupForm() {
   const {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
   } = useForm<SignupTypes>();
   const onSubmit: SubmitHandler<SignupTypes> = async (data) => {
      const response = await SignupPost(data);
      // 성공시 로그인페이지로
      // if(성공) navigate('/');
      // 실패시 ?
      // 1.아이디, 닉네임 중복 실패
      // 2.네크워크 오류
      console.log(data);
   };

   const contentsArr: InputContents[] = [
      {
         labelName: "닉네임",
         contents: "NickName",
         errorMessage: "닉네임은 10자 이하입니다.",
         validFunction: validFunc.validNickName,
      },
      {
         labelName: "이메일 아이디",
         contents: "email",
         errorMessage: "유효하지 않은 이메일 형식 입니다.",
         validFunction: validFunc.validEmail,
      },
      {
         labelName: "비밀번호",
         contents: "password",
         errorMessage: "비밀번호는 8자 이상 입니다.",
         validFunction: validFunc.validPassword,
      },
      {
         labelName: "비밀번호확인",
         contents: "passwordConfirm",
         errorMessage: "비밀번호와 일치하지 않습니다.",
         validFunction: () => true,
      },
      {
         labelName: "본인인증 주민번호",
         contents: "SocialNumber",
         errorMessage: "주민번호 형식에 맞게 작성해주세요",
         validFunction: validFunc.validSocialNumber,
      },
      {
         labelName: "비밀번호 찾기용 질문",
         contents: "question",
         errorMessage: "",
         validFunction: () => true,
      },
      {
         labelName: "비밀번호 찾기용 답",
         contents: "answer",
         errorMessage: "확실해요?",
         validFunction: validFunc.validAnswer,
      },
   ];

   return (
      <SignupFormContainer onSubmit={handleSubmit(onSubmit)}>
         <img className="logo" src={logo} alt="logo" />
         {contentsArr.map((el) => {
            if (el.contents === "question") {
               return (
                  <SignupQuestion
                     key={el.contents}
                     register={register}
                     {...el}
                  />
               );
            }
            return (
               <SignupInput
                  key={el.contents}
                  register={register}
                  errors={errors}
                  getValues={getValues}
                  {...el}
               />
            );
         })}

         <button type="submit" className="submit-button">
            회원가입
         </button>
         <SignupOauth />
      </SignupFormContainer>
   );
}

export default SignupForm;

const SignupFormContainer = styled.form`
   display: flex;
   position: relative;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   width: 550px;
   height: 750px;
   padding-top: 5%;
   background-color: var(--second-color1);
   box-shadow: 2px 3px 5px 0;
   border-radius: 10px;
   .logo {
      position: absolute;
      width: 200px;
      height: 200px;
      top: -100px;
      left: 50%;
      transform: translate(-50%, 0);
   }
   .submit-button {
      width: 70%;
      height: 40px;
      font-size: var(--font-large);
      border-radius: 1000px;
      background-color: var(--second-color3);
      color: white;
      cursor: pointer;
      transition-duration: 0.2s;
      &:hover {
         background-color: var(--second-color4);
         transition-duration: 0.2s;
      }
   }
`;
