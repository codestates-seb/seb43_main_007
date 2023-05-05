import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./style/GlobalStyle";
import NavbarSearch from "./components/NavBar";

function App() {
   return (
      <BrowserRouter>
         <GlobalStyles />
         <NavbarSearch />
      </BrowserRouter>
   );
}

export default App;
