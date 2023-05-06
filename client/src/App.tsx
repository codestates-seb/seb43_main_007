import { Button } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./style/GlobalStyle";
import Footer from "./components/footer/Footer";

function App() {
   return (
      <BrowserRouter>
         <GlobalStyles />
         <Button>Click me!</Button>
         <Footer />
      </BrowserRouter>
   );
}

export default App;
