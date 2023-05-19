import styled from "styled-components";
import { useState } from "react";
import BookmarkItem from "./BookmarkItem";
import { dummyBookmark } from "./dummyBookmark";
import BookmarkPagination from "./BookmarkPagination";

function BookmarkBox() {
   const manyDummy = new Array(22).fill([...dummyBookmark]).flat();
   const totalDataCount = manyDummy.length;
   const [currentPage, setCurrentPage] = useState(1);
   // 페이지당 item 개수
   const limitItems = 6;
   // 페이지당 item limitItems만큼 렌더링
   const currentItems = manyDummy.slice(
      (currentPage - 1) * limitItems,
      currentPage * limitItems
   );
   return (
      <BookmarkBoxContainer>
         {currentItems.map((data) => {
            return (
               <BookmarkItem
                  key={data.questionId * Math.random()}
                  data={data}
               />
            );
         })}
         <BookmarkPagination
            totalDataCount={totalDataCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            limitItems={limitItems}
         />
      </BookmarkBoxContainer>
   );
}

export default BookmarkBox;

const BookmarkBoxContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   margin-top: 5%;
   height: 1000px;
   padding: 10px;
`;
