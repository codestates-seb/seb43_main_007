import styled from "styled-components";
import SigninForm from "../components/signin/SigninForm";

function Signin() {
   return (
      <SigninContainer>
         <SigninForm />
      </SigninContainer>
   );
}

export default Signin;

const SigninContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 100vh;
`;
