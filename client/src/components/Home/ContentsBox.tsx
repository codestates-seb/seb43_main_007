import styled from "styled-components";
import { EditorPickContentType } from "./editorPickDummyContents";

function ContentsBox({ post }: { post: EditorPickContentType }) {
   return (
      <ContentsBoxContainer>
         <h2>{post.title}</h2>
         <div>
            <span>{post.author}</span>
         </div>
         <p>{post.content}</p>
      </ContentsBoxContainer>
   );
}

export default ContentsBox;

const ContentsBoxContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 50px;
   min-width: 700px;
   height: 95%;
   background-color: var(--first-color3);
   margin: 0 10px;
   box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
      rgba(0, 0, 0, 0.22) 0px 15px 12px;
`;
