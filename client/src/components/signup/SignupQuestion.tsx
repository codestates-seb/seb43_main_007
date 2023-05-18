import styled from "styled-components";
import { UseFormRegister } from "react-hook-form";
import { SignupTypes } from "./signupTypes";

interface Props {
   register: UseFormRegister<SignupTypes>;
   labelName: string;
   contents: keyof SignupTypes;
}

function SignupQuestion({ register, labelName, contents }: Props) {
   const questionList = [
      "내가 졸업한 초등학교는?",
      "내 별명은?",
      "내 보물 1호는?",
      "내가 가장 자주먹는 커피메뉴는?",
   ];
   return (
      <SignupQuestionContainer>
         <label htmlFor={`input-${contents}`} className="contents-label">
            {labelName}
         </label>
         <select
            id={`input-${contents}`}
            className="input"
            {...register(`${contents}`)}
         >
            {questionList.map((el) => {
               return (
                  <option key={el} value={el}>
                     {el}
                  </option>
               );
            })}
         </select>
      </SignupQuestionContainer>
   );
}

export default SignupQuestion;

const SignupQuestionContainer = styled.div`
   display: flex;
   flex-direction: column;
   width: 70%;
   height: 60px;
   margin-bottom: 10px;
   color: var(--first-color4);
   .contents-label {
      font-size: var(--font-base);
      margin-bottom: 5px;
   }
   .input {
      border-width: 0 0 3px 0;
      border-color: black;
      margin-bottom: 2px;
      background-color: transparent;
      height: 30px;
      font-size: var(--font-base);
      cursor: pointer;
   }
`;
