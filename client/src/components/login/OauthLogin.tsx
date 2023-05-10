import styled from "styled-components";
import googleIcon from "../../assets/img/google-icon.png";
import githubIcon from "../../assets/img/github-icon.png";

function OauthLogin() {
   return (
      <OauthLoginContainer>
         <button type="button" className="oauth-box">
            <div className="icon">
               <img className="google" src={googleIcon} alt="google-icon" />
            </div>
            <div className="text">Google 로그인</div>
         </button>
         <button type="button" className="oauth-box">
            <div className="icon">
               <img className="github" src={githubIcon} alt="github-icon" />
            </div>
            <div className="text">Github 로그인</div>
         </button>
      </OauthLoginContainer>
   );
}

export default OauthLogin;

const OauthLoginContainer = styled.div`
   display: flex;
   flex-direction: column;
   width: 70%;
   margin-top: 5%;
   .oauth-box {
      display: flex;
      margin: 2% 0;
      border: 1px solid var(--third-color4);
      border-radius: 5px;
      padding: 0;
      cursor: pointer;
      background-color: var(--second-color1);
      .icon {
         display: flex;
         justify-content: center;
         align-items: center;
         border-right: 0.5px solid var(--third-color4);
         width: 12%;
         height: 45px;
         .google {
            width: 50px;
            height: 45px;
         }
         .github {
            width: 40px;
            height: 40px;
         }
      }
      .text {
         display: flex;
         width: 88%;
         height: 100%;
         justify-content: center;
         align-items: center;
         font-size: var(--font-large);
         color: var(--third-color4);
         transition-duration: 0.2s;
         &:hover {
            background-color: var(--second-color3);
            color: white;
            transition-duration: 0.2s;
         }
      }
   }
`;
