import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./style/GlobalStyle";
import Footer from "./components/footer/Footer";
import RoutingPage from "./pages/RoutingPage";

function App() {
   return (
      <Container>
         <BrowserRouter>
            <GlobalStyles />
            <RoutingPage />
         </BrowserRouter>
         <div className="footer">
            <Footer />
         </div>
      </Container>
   );
}

export default App;
const Container = styled.div`
   position: relative;
   width: 100%;
   .footer {
      display: flex;
      /* flex-direction: column; */
   }
`;
