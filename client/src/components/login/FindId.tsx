import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
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
   const onSubmit: SubmitHandler<SocialNum> = (data) => console.log(data);

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
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 50px;
      .social-number-input {
         width: 70%;
         height: 30px;
         margin-bottom: 1%;
         font-size: var(--font-base);
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
      height: 30px;
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
