import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./style/GlobalStyle";
import Home from "./pages/Home";
import Footer from "./components/footer/Footer";
import NavbarSearch from "./components/NavBar";
import Login from "./pages/Login";

function App() {
   return (
      <Container>
         <BrowserRouter>
            <GlobalStyles />
            {/* <div className="nav">
               <NavbarSearch />
               <Home />
            </div>

            <div className="footer">
               <Footer />
            </div> */}
            <Login />
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
