import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./style/GlobalStyle";
import Home from "./pages/Home";

function App() {
   return (
      <BrowserRouter>
         <GlobalStyles />
         <Home />
      </BrowserRouter>
   );
}

export default App;
