import styled from "styled-components";
import BookmarkItem from "./BookmarkItem";

function BookmarkBox() {
   const dataArr = [1, 2, 3, 4, 5, 6];
   return (
      <BookmarkBoxContainer>
         {dataArr.map((el) => {
            return <BookmarkItem key={el} />;
         })}
      </BookmarkBoxContainer>
   );
}

export default BookmarkBox;

const BookmarkBoxContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
   align-items: center;
   height: 800px;
   padding: 10px;
`;
