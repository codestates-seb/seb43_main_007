import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./style/GlobalStyle";
import Footer from "./components/footer/Footer";
import NavbarSearch from "./components/NavBar";


function App() {
   return (
      <BrowserRouter>
         <GlobalStyles />
         <NavbarSearch />
         <Button>Click me!</Button>
         <Footer />
      </BrowserRouter>
   );
}

export default App;
