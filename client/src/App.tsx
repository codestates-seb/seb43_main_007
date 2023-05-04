import { Button } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./style/GlobalStyle";

function App() {
   return (
      <BrowserRouter>
         <GlobalStyles />
         <Button>Click me!</Button>
      </BrowserRouter>
   );
}

export default App;
