import styled from "styled-components";
import background from "../assets/img/home-background.jpg";

function HomeTree() {
   return <HomeTreeContainer />;
}

export default HomeTree;

const HomeTreeContainer = styled.div`
   display: flex;
   width: 100%;
   height: 100%;
   z-index: 1000;
   background-image: url(${background});
   /* background-size: cover; */
`;
