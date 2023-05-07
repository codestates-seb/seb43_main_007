import styled from "styled-components";
import {
   UseFormRegister,
   FieldErrors,
   UseFormGetValues,
} from "react-hook-form";
import { SigninContents } from "./SigninContents";

interface Props {
   register: UseFormRegister<SigninContents>;
   getValues: UseFormGetValues<SigninContents>;
   labelName: string;
   contents: keyof SigninContents;
   errors: FieldErrors<SigninContents>;
   errorMessage: string;
   validFunction: (v1: string) => boolean | string;
}

function SigninInput({
   register,
   labelName,
   getValues,
   contents,
   errors,
   errorMessage,
   validFunction,
}: Props) {
   const handleType = (content: string) => {
      if (content === "password" || content === "passwordConfirm")
         return "password";
      return "text";
   };

   return (
      <SigninInputContainer>
         <label htmlFor={`input-${contents}`} className="contents-label">
            {labelName}
         </label>
         <input
            id={`input-${contents}`}
            className="input"
            type={handleType(contents)}
            {...register(`${contents}`, {
               required: true,
               validate:
                  contents !== "passwordConfirm"
                     ? validFunction
                     : (value) => {
                          const { password } = getValues();
                          return password === validFunction(value);
                       },
            })}
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
