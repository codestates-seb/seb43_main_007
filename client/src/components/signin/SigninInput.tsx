import styled from "styled-components";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { SigninContents } from "./SigninContents";

interface Props {
   register: UseFormRegister<SigninContents>;
   labelName: string;
   contents: keyof SigninContents;
   errors: FieldErrors<SigninContents>;
   errorMessage: string;
}

function SigninInput({
   register,
   labelName,
   contents,
   errors,
   errorMessage,
}: Props) {
   return (
      <SigninInputContainer>
         <label htmlFor={`input-${contents}`} className="contents-label">
            {labelName}
         </label>
         <input
            id={`input-${contents}`}
            className="input"
            {...register(`${contents}`, { required: true })}
         />
         {errors[contents] && (
            <span className="error-message">{errorMessage}</span>
         )}
      </SigninInputContainer>
   );
}

export default SigninInput;

const SigninInputContainer = styled.div`
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
   }
   .error-message {
      color: red;
   }
`;
