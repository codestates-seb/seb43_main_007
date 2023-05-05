import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./style/GlobalStyle";
import MypageProfile from "./pages/MypageProfile";

function App() {
   return (
      <BrowserRouter>
         <GlobalStyles />
         <MypageProfile />
      </BrowserRouter>
   );
}

export default App;
