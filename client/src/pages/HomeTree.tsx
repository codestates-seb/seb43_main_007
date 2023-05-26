import styled from "styled-components";
import background from "../assets/img/home-background.jpg";

function HomeTree() {
   return <HomeTreeContainer />;
}

export default HomeTree;

const HomeTreeContainer = styled.div`
   display: flex;
   width: 100vw;
   height: 100%;
   background-image: url(${background});
   background-size: 100% 100%;
`;
