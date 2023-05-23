import styled from "styled-components";
import MapBox from "./MapBox";
import { EditerPickType } from "./editorPickDummyContents";

interface Props {
   pick: EditerPickType;
   id: number;
}

function ContentsBox({ pick, id }: Props) {
   const parsedDate = pick.now
      ? new Date(pick.now).toLocaleString("ko-kr")
      : "";
   return (
      <ContentsBoxContainer>
         <h1 className="title">{pick.title}</h1>
         <div className="author-createdAt-box">
            <span className="createdAt">{parsedDate}</span>
         </div>
         {pick.address !== "" ? <MapBox data={pick.address} id={id} /> : null}
         <p
            className="content"
            dangerouslySetInnerHTML={{ __html: pick.content }}
         />
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
   overflow-y: scroll;
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
   .content {
      p {
         margin: 2px 0;
      }
      img {
         margin: 5px 0;
         max-width: 100%;
      }
   }
`;
