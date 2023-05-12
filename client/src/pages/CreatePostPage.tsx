import styled from "styled-components";
import GuideLine from "../components/CreatePost/GuideLine";
import QuillTextEditor from "../components/CreatePost/QuillTextEditor";
import TitleTagCommuForm from "../components/CreatePost/TitleTagCommuForm";

function CreatePost() {
   return (
      <DivContainer>
         <div>
            <GuideLine />
         </div>
         <div>
            <TitleTagCommuForm />
            <QuillTextEditor />
         </div>
      </DivContainer>
   );
}

export default CreatePost;

const DivContainer = styled.div`
   display: flex;
   flex-direction: column;
   margin: 16px 0px 0px 16px;
`;
