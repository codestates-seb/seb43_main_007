import styled from "styled-components";
import logo from "../../assets/img/logo1.png";
import Introduce from "./Introduce";
import TeamInfo from "./TeamInfo";
import grassField from "../../assets/img/grassfield.png";

function Footer() {
   return (
      <FooterContainer>
         <img src={logo} className="logo" alt="logo" />
         <TeamInfo />
         <Introduce />
      </FooterContainer>
   );
}

export default Footer;

const FooterContainer = styled.div`
   display: flex;
   justify-content: center;
   background-image: url(${grassField}),
      linear-gradient(to top, var(--second-color2) 0%, #fff 100%);
   background-position: 0 100%;
   width: 100%;
   height: 150px;
   padding: 0 10px;
   color: var(--third-color4);
   z-index: 100;
   .logo {
      width: 160px;
   }
`;
