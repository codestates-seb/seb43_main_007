import styled from "styled-components";
import GuideLine from "../components/CreatePost/GuideLine";
import TextEditor from "../components/CreatePost/TextEditor";

function CreatePost() {
   return (
      <DivContainer>
         <GuideLine />
         <TextEditor />
      </DivContainer>
   );
}

export default CreatePost;

const DivContainer = styled.div`
   display: flex;
   flex-direction: column;
   /* justify-content: center; */
   margin: 16px 0px 0px 16px;
   width: 100%;
   height: 100vh;
   /* border: 1px solid black; */
`;
