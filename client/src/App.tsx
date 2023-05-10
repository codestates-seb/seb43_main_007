import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./style/GlobalStyle";
import MypageProfile from "./pages/MypageProfile";
import Home from "./pages/Home";
import Footer from "./components/footer/Footer";
import NavbarSearch from "./components/NavBar";
import Signin from "./pages/Signin";

function App() {
   return (
      <Container>
         <BrowserRouter>
            <GlobalStyles />
            <div className="nav">
               <NavbarSearch />
               <MypageProfile />
            </div>
            <div className="footer">
               <Footer />
            </div>
         </BrowserRouter>
      </Container>
   );
}

export default App;

const Container = styled.div`
   position: relative;
   width: 100%;
   .nav {
      display: flex;
   }
   .footer {
      display: flex;
      /* flex-direction: column; */
   }
`;
