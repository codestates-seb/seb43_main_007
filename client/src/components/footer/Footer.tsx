import styled from "styled-components";
import logo from "../../../public/img/logo1.png";
import Introduce from "./Introduce";
import TeamInfo from "./TeamInfo";

function Footer() {
   return (
      <FooterContainer>
         <img src={logo} className="logo" alt="logo" />
         <Introduce />
         <TeamInfo />
      </FooterContainer>
   );
}

export default Footer;

const FooterContainer = styled.div`
   display: flex;
   background-color: #edc6b1;
   height: 200px;
   padding: 0 50px;
   color: var(--third-color4);
   .logo {
      width: 220px;
   }
`;
