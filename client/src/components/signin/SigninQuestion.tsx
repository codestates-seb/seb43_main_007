import styled from "styled-components";
import { UseFormRegister } from "react-hook-form";
import { SigninContents } from "./SigninTypes";

interface Props {
   register: UseFormRegister<SigninContents>;
   labelName: string;
   contents: keyof SigninContents;
}

function SigninQuestion({ register, labelName, contents }: Props) {
   const questionList = [
      "내가 졸업한 초등학교는?",
      "내 별명은?",
      "내 보물 1호는?",
      "내가 가장 자주먹는 커피메뉴는?",
   ];
   return (
      <SigninQuestionContainer>
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
      </SigninQuestionContainer>
   );
}

export default SigninQuestion;

const SigninQuestionContainer = styled.div`
   display: flex;
   flex-direction: column;
   width: 70%;
   height: 70px;
   margin-bottom: 10px;
   color: var(--first-color4);
   .contents-label {
      font-size: 1.2em;
      margin-bottom: 5px;
   }
   .input {
      border-width: 0 0 3px 0;
      border-color: black;
      margin-bottom: 2px;
      background-color: transparent;
      height: 30px;
      font-size: 1.2em;
      cursor: pointer;
   }
`;
