import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./style/GlobalStyle";
import Signin from "./pages/Signin";

function App() {
   return (
      <BrowserRouter>
         <GlobalStyles />
         <Signin />
      </BrowserRouter>
   );
}

export default App;
