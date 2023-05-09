import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useRef } from "react";
import validFunction from "../../util/signinValidFunc";

interface SocialNum {
   socialNumber: string;
}

function FindId() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<SocialNum>();

   // 페이지 입장할 때 첫 input에 focus
   const inputRef = useRef<HTMLInputElement | null>(null);
   const { ref } = register("socialNumber");
   useEffect(() => {
      if (inputRef.current !== null) inputRef.current.focus();
   }, []);

   const onSubmit: SubmitHandler<SocialNum> = (data) => {
      // 아이디 찾기 요청 함수자리
      // 아이디 찾기 성공시 modal 창으로 아이디 띄워주기
      // 아이디 찾기 실패시 실패 modal 창 띄우기
      console.log(data);
   };

   return (
      <FindIdContainer onSubmit={handleSubmit(onSubmit)}>
         <span className="text">주민등록번호를 입력하세요.</span>
         <div className="input-box">
            <input
               className="social-number-input"
               {...register("socialNumber", {
                  required: true,
                  validate: validFunction.validSocialNumber,
               })}
               ref={(e) => {
                  ref(e);
                  inputRef.current = e;
               }}
            />
            {errors.socialNumber && (
               <span className="error-message">
                  주민등록번호 형식으로 입력해주세요
               </span>
            )}
         </div>
         <button className="submit" type="submit">
            아이디 찾기
         </button>
      </FindIdContainer>
   );
}

export default FindId;

const FindIdContainer = styled.form`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 90%;
   padding-bottom: 5%;
   .text {
      display: inline-block;
      width: 70%;
      font-size: var(--font-large);
      margin-bottom: 3%;
      color: var(--third-color4);
   }
   .input-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 50px;
      .social-number-input {
         width: 70%;
         height: 30px;
         margin-bottom: 1%;
         font-size: var(--font-base);
         border-radius: 5px;
         border: 1px solid var(--third-color2);
      }
      .error-message {
         display: inline-block;
         width: 70%;
         color: red;
         font-size: var(--font-small);
      }
   }
   .submit {
      width: 70%;
      height: 40px;
      margin-top: 5%;
      font-size: var(--font-base);
      color: white;
      cursor: pointer;
      background-color: var(--second-color3);
      border: 2px outset var(--second-color3);
      border-radius: 5px;
      &:hover {
         background-color: var(--third-color3);
         border-color: var(--third-color3);
      }
   }
`;
