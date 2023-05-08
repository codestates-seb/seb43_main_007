import styled from "styled-components";
import { useState } from "react";
import LoginForm from "../components/login/LoginForm";
import FindAndSignin from "../components/login/FindAndSignin";
import OauthLogin from "../components/login/OauthLogin";
import FindModal from "../components/login/FindModal";

function Login() {
   const [isFindModalOpen, setIsFindModalOpen] = useState(false);
   const [curTab, setCurTab] = useState<"id" | "password">("id");
   return (
      <LoginContainer>
         <FormContainer>
            <span className="login-text">LOGIN</span>
            <LoginForm />
            <FindAndSignin
               setIsOpen={setIsFindModalOpen}
               setCurTab={setCurTab}
            />
            <OauthLogin />
         </FormContainer>
         <FindModal
            isOpen={isFindModalOpen}
            setIsOpen={setIsFindModalOpen}
            curTab={curTab}
            setCurTab={setCurTab}
         />
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
   width: 550px;
   height: 600px;
   padding-top: 5%;
   background-color: var(--second-color1);
   box-shadow: 2px 3px 5px 0;
   border-radius: 10px;
   .login-text {
      color: var(--third-color4);
      font-size: 40px;
      font-weight: 900;
      margin: 30px 0;
      letter-spacing: 5px;
   }
`;
