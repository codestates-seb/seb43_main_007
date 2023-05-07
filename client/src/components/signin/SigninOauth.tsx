import styled from "styled-components";
import googleIcon from "../../../public/img/google-icon.png";
import githubIcon from "../../../public/img/github-icon.png";

function SigninOauth() {
   return (
      <SigninOauthContainer>
         <span className="sns-text">SNS로 회원가입 해보세요</span>
         <div className="oauth-box">
            <button className="oauth-button" type="button">
               <img
                  className="google-icon"
                  src={googleIcon}
                  alt="google-icon"
               />
            </button>
            <button className="oauth-button" type="button">
               <img
                  className="github-icon"
                  src={githubIcon}
                  alt="github-icon"
               />
            </button>
         </div>
      </SigninOauthContainer>
   );
}

export default SigninOauth;

const SigninOauthContainer = styled.div`
   margin-top: 30px;
   .sns-text {
      font-size: 25px;
   }
   .oauth-box {
      display: flex;
      margin-top: 15px;
      .oauth-button {
         width: 100px;
         height: 100px;
         border: none;
         border-radius: 50%;
         background-color: var(--second-color1);
         margin: 0 20px;
         cursor: pointer;
         .google-icon {
            width: 100%;
            height: 80%;
         }
         .github-icon {
            width: 90%;
            height: 72%;
         }
      }
   }
`;
