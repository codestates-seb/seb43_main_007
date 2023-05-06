import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./style/GlobalStyle";
import CommunityList from "./pages/CommunityList";
import NavbarSearch from "./components/NavBar";

function App() {
   return (
      <BrowserRouter>
         <GlobalStyles />
         <NavbarSearch />
         <CommunityList />
      </BrowserRouter>
   );
}

export default App;
