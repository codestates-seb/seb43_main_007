import styled from "styled-components";
import HomeHeader from "../components/home/HomeHeader";
import EditerPick from "../components/home/EditerPick";

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
   background-color: aqua;
`;
