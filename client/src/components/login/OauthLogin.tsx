import styled from "styled-components";
import googleIcon from "../../assets/img/google-icon.png";

interface Props {
   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function OauthLogin({ setIsLoading }: Props) {
   const handleOauthLogin = () => {
      setIsLoading(true);
      window.location.assign(
         `${import.meta.env.VITE_API}oauth2/authorization/google`
      );
   };
   return (
      <OauthLoginContainer>
         <button type="button" className="oauth-box" onClick={handleOauthLogin}>
            <div className="icon">
               <img className="google" src={googleIcon} alt="google-icon" />
            </div>
            <div className="text">Google 로그인</div>
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
      height: 60px;
      .icon {
         display: flex;
         justify-content: center;
         align-items: center;
         border-right: 0.5px solid var(--third-color4);
         width: 18%;
         height: 60px;
         .google {
            width: 90px;
            height: 60px;
         }
      }
      .text {
         display: flex;
         width: 88%;
         height: 100%;
         justify-content: center;
         align-items: center;
         font-size: 25px;
         color: var(--third-color4);
         transition-duration: 0.2s;
         &:hover {
            background-color: var(--second-color3);
            color: white;
            transition-duration: 0.2s;
         }
      }
   }
   @media screen and (max-width: 768px) {
      .oauth-box {
         .icon {
            width: 20%;
            height: 60px;
            .google {
               width: 60px;
               height: 50px;
            }
         }
         .text {
            font-size: 20px;
         }
      }
   }
`;
