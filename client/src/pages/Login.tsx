import styled from "styled-components";
import LoginForm from "../components/login/LoginForm";
import FindAndSignin from "../components/login/FindAndSignin";
import OauthLogin from "../components/login/OauthLogin";

function Login() {
   return (
      <LoginContainer>
         <FormContainer>
            <span className="login-text">LOGIN</span>
            <LoginForm />
            <FindAndSignin />
            <OauthLogin />
         </FormContainer>
      </LoginContainer>
   );
}

export default Login;

const LoginContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 100vh;
`;

const FormContainer = styled.div`
   display: flex;
   position: relative;
   flex-direction: column;
   align-items: center;
   width: 650px;
   height: 70%;
   padding-top: 3%;
   background-color: var(--second-color1);
   box-shadow: 2px 3px 5px 0;
   border-radius: 10px;
   .login-text {
      color: var(--third-color4);
      font-size: 40px;
      font-weight: 900;
      margin: 50px 0;
      letter-spacing: 5px;
   }
`;
