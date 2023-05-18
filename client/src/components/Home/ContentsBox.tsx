import styled from "styled-components";
import { EditorPickContentType } from "./editorPickDummyContents";
import MapBox from "./MapBox";

interface Props {
   post: EditorPickContentType;
   id: number;
}

function ContentsBox({ post, id }: Props) {
   const parsedDate = new Date(post.createdAt).toLocaleString("ko-kr");
   return (
      <ContentsBoxContainer>
         <h1 className="title">{post.title}</h1>
         <div className="author-createdAt-box">
            {/* <span className="author">{post.author}</span>
            <span className="createdAt">{parsedDate}</span> */}
         </div>
         <MapBox data={post.address} id={id} />
         <p className="content">{post.content}</p>
      </ContentsBoxContainer>
   );
}

export default ContentsBox;

const ContentsBoxContainer = styled.div`
   display: flex;
   flex-direction: column;
   padding: 30px;
   min-width: 700px;
   height: 95%;
   background-color: var(--first-color3);
   margin: 0 10px;
   box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
      rgba(0, 0, 0, 0.22) 0px 15px 12px;
   .title {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 25px;
      margin-bottom: 20px;
   }
   .author-createdAt-box {
      display: flex;
      flex-direction: column;
      align-items: end;
      .author,
      .createdAt {
         margin: 5px 0;
         font-size: var(--font-large);
      }
   }
`;
