import styled from "styled-components";
import GuideLine from "../components/CreatePost/GuideLine";

function CreatePost() {
   return (
      <DivContainer>
         <GuideLine />
      </DivContainer>
   );
}

export default CreatePost;

const DivContainer = styled.div`
   display: flex;
   justify-content: center;
   width: 100%;
   height: 100vh;
   border: 1px solid black;
`;
