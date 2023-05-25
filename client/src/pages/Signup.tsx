import styled from "styled-components";
import SignupForm from "../components/signup/SignupForm";
import leafImg from "../assets/img/login-background-img.png";

function Signup() {
   return (
      <SignupContainer>
         <img className="leaf-img" src={leafImg} alt="leaf-img" />
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
   position: fixed;
   top: 0;
   left: 0;
   background-image: linear-gradient(
      to right,
      var(--second-color1) 20%,
      var(--second-color2)
   );
   .leaf-img {
      margin-right: 10%;
   }
   @media screen and (max-width: 1180px) {
      .leaf-img {
         margin-right: 2%;
      }
   }
   @media screen and (max-width: 1024px) {
      .leaf-img {
         display: none;
      }
   }
`;
