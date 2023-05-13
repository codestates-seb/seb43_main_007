import styled from "styled-components";
import SignupForm from "../components/signup/SignupForm";

function Signup() {
   return (
      <SignupContainer>
         <SignupForm />
      </SignupContainer>
   );
}

export default Signup;

const SignupContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 100%;
   margin-left: -150px; // navbar 자리 채우기
`;
