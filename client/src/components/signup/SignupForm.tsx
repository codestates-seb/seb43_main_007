import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import SignupInput from "./SignupInput";
import contentsArr, { SignupTypes } from "./contentsArray";
import SignupQuestion from "./SignupQuestion";
import logo from "../../assets/img/logo2.png";
import { signupPost } from "../../api/axios";
import SignupModal from "./SignupModal";
import getMessage from "./getMessage";
import Loading from "../Loading";

function SignupForm() {
   const navigate = useNavigate();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      const response = await signupPost(data);
      setIsLoading(false);
      // 성공, 실패 case에 따라 modal을 띄워주는 함수
      getMessage(response, setMessage, setIsModalOpen);
   };

   const navToHome = () => {
      navigate("/home");
   };

   return (
      <SignupFormContainer onSubmit={handleSubmit(onSubmit)}>
         <button onClick={navToHome} type="button" className="logo-container">
            <img className="logo" src={logo} alt="logo" />
         </button>
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
         {isLoading ? (
            <LoadingContainer className="loading-container">
               <Loading />
            </LoadingContainer>
         ) : null}
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

const LoadingContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: rgba(128, 128, 128, 0.2);
`;
