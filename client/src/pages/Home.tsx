import styled from "styled-components";
import HomeHeader from "../components/Home/HomeHeader";
import EditerPick from "../components/Home/EditerPick";

function Home() {
   return (
      <HomeContainer>
         <HomeHeader />
         <EditerPick />
      </HomeContainer>
   );
}
export default Home;

const HomeContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 1080px;
   height: 100vh;
   background-color: aqua;
`;
