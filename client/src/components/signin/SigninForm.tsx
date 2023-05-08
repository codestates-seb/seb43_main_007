import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import SigninInput from "./SigninInput";
import { SigninContents } from "./SigninContents";
import SigninQuestion from "./SigninQuestion";
import SigninOauth from "./SigninOauth";
import validFunc from "./signinValidFunc";
import logo from "../../../public/img/logo2.png";

interface InputContents {
   labelName: string;
   contents: keyof SigninContents;
   errorMessage: string;
   validFunction: (v: string) => boolean;
}

function SigninForm() {
   const {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
   } = useForm<SigninContents>();
   const onSubmit: SubmitHandler<SigninContents> = (data) => console.log(data);

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
      <SigninFormContainer onSubmit={handleSubmit(onSubmit)}>
         <img className="logo" src={logo} alt="logo" />
         {contentsArr.map((el) => {
            if (el.contents === "question") {
               return (
                  <SigninQuestion
                     key={el.contents}
                     register={register}
                     {...el}
                  />
               );
            }
            return (
               <SigninInput
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
         <SigninOauth />
      </SigninFormContainer>
   );
}

export default SigninForm;

const SigninFormContainer = styled.form`
   display: flex;
   position: relative;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   width: 650px;
   height: 85%;
   padding-top: 50px;
   background-color: var(--second-color1);
   box-shadow: 2px 3px 5px 0;
   .logo {
      position: absolute;
      width: 200px;
      height: 200px;
      top: -100px;
      left: 50%;
      transform: translate(-50%, 0);
   }
   .submit-button {
      width: 350px;
      height: 50px;
      font-size: 1.5em;
      border-radius: 1000px;
      background-color: var(--second-color3);
      cursor: pointer;
   }
`;
