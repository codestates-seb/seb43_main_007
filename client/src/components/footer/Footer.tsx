import styled from "styled-components";
import logo from "../../../public/img/logo1.png";
import Introduce from "./Introduce";

function Footer() {
   return (
      <FooterContainer>
         <img src={logo} className="logo" alt="logo" />
         <Introduce />
         <div>팀</div>
      </FooterContainer>
   );
}

export default Footer;

const FooterContainer = styled.div`
   display: flex;
   background-color: #edc6b1;
   height: 200px;
   .logo {
      width: 220px;
   }
`;
