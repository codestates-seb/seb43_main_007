import styled from "styled-components";
import {
   UseFormRegister,
   FieldErrors,
   UseFormGetValues,
} from "react-hook-form";
import { SignupTypes } from "./SignupTypes";

interface Props {
   register: UseFormRegister<SignupTypes>;
   getValues: UseFormGetValues<SignupTypes>;
   labelName: string;
   contents: keyof SignupTypes;
   errors: FieldErrors<SignupTypes>;
   errorMessage: string;
   validFunction: (v1: string) => boolean;
}

function SignupInput({
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
      <SignupInputContainer>
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
                          return password === value;
                       },
            })}
         />
         {errors[contents] && (
            <span className="error-message">{errorMessage}</span>
         )}
      </SignupInputContainer>
   );
}

export default SignupInput;

const SignupInputContainer = styled.div`
   display: flex;
   flex-direction: column;
   width: 70%;
   height: 50px;
   margin-bottom: 10px;
   color: var(--first-color4);
   .contents-label {
      font-size: var(--font-base);
      margin-bottom: 3px;
   }
   .input {
      border-width: 0 0 3px 0;
      border-color: black;
      margin-bottom: 2px;
      background-color: transparent;
      height: 25px;
      font-size: var(--font-base);
   }
   .error-message {
      color: red;
      font-size: 12px;
   }
`;
