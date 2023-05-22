import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import SignupInput from "./SignupInput";
import { SignupTypes } from "./SignupTypes";
import SignupQuestion from "./SignupQuestion";
import logo from "../../assets/img/logo2.png";
import { signupPost } from "../../api/axios";
import SignupModal from "./SignupModal";
import contentsArr from "./contentsArray";
import getMessage from "./getMessage";

function SignupForm() {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [message, setMessage] = useState({
      text1: "",
      text2: "",
   });
   const {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
   } = useForm<SignupTypes>();
   const onSubmit: SubmitHandler<SignupTypes> = async (data) => {
      const response = await signupPost(data);
      // 성공, 실패 case에 따라 modal을 띄워주는 함수
      getMessage(response, setMessage, setIsModalOpen);
   };

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
         <SignupModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            message={message}
         />
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
   height: 700px;
   background-color: var(--second-color1);
   box-shadow: 2px 3px 5px 0;
   border-radius: 10px;
   padding-top: 15px;
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
      margin-top: 4%;
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
   @media screen and (max-width: 768px) {
      height: 80%;
      padding-top: 10px;
      .logo {
         width: 150px;
         height: 150px;
         top: -75px;
      }
   }
`;
