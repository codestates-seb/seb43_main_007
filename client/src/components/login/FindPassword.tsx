import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useRef } from "react";
import validFunction from "../../util/signinValidFunc";

interface FindPasswordType {
   email: string;
   question: string;
   answer: string;
}

function FindPassword() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FindPasswordType>();

   // 페이지 입장할 때 첫 input에 focus
   const inputRef = useRef<HTMLInputElement | null>(null);
   const { ref } = register("email");
   useEffect(() => {
      if (inputRef.current !== null) inputRef.current.focus();
   }, []);

   const onSubmit: SubmitHandler<FindPasswordType> = (data) => {
      // 비밀번호 찾기 요청 함수자리
      // 비밀번호 찾기 성공시 modal 창으로 비밀번호 띄워주기
      // 비밀번호 찾기 실패시 실패 modal 창 띄우기
      console.log(data);
   };

   const questionList = [
      "내가 졸업한 초등학교는?",
      "내 별명은?",
      "내 보물 1호는?",
      "내가 가장 자주먹는 커피메뉴는?",
   ];

   return (
      <FindPasswordContainer onSubmit={handleSubmit(onSubmit)}>
         <div className="input-box">
            <label className="label" htmlFor="email">
               E-mail
            </label>
            <input
               id="email"
               className="input"
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
                  이메일 형식으로 입력해주세요.
               </span>
            )}
         </div>
         <div className="input-box">
            <label className="label" htmlFor="question">
               비밀번호 찾기 질문
            </label>
            <select id="question" className="input" {...register("question")}>
               {questionList.map((el) => {
                  return (
                     <option key={el} value={el}>
                        {el}
                     </option>
                  );
               })}
            </select>
         </div>
         <div className="input-box">
            <label className="label" htmlFor="answer">
               비밀번호 찾기 답
            </label>
            <input
               id="answer"
               className="input"
               {...register("answer", {
                  required: true,
                  validate: validFunction.validAnswer,
               })}
            />
            {errors.answer && <span className="error-message">확실해요?</span>}
         </div>
         <button className="submit" type="submit">
            비밀번호 찾기
         </button>
      </FindPasswordContainer>
   );
}

export default FindPassword;

const FindPasswordContainer = styled.form`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
   height: 90%;
   padding-top: 5%;
   .label {
      display: inline-block;
      width: 70%;
      font-size: var(--font-base);
      margin-bottom: 1%;
      color: var(--third-color4);
   }
   .input-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 70px;
      .input {
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
      #question {
         cursor: pointer;
      }
   }
   .submit {
      width: 70%;
      height: 40px;
      margin-top: 2%;
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
