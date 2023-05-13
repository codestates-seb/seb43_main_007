import styled from "styled-components";
import BookmarkItem from "./BookmarkItem";
import { dummyBookmark } from "./dummyBookmark";

function BookmarkBox() {
   const manyDummy = [...dummyBookmark, ...dummyBookmark];
   return (
      <BookmarkBoxContainer>
         {manyDummy.map((data) => {
            return <BookmarkItem key={data.questionId} data={data} />;
         })}
      </BookmarkBoxContainer>
   );
}

export default BookmarkBox;

const BookmarkBoxContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
   margin-top: 10%;
   height: 800px;
   padding: 10px;
`;
