import styled from "styled-components";
import { useState } from "react";
import BookmarkItem from "./BookmarkItem";
import { dummyBookmark } from "./dummyBookmark";
import BookmarkPagination from "./BookmarkPagination";

function BookmarkBox() {
   const manyDummy = new Array(11).fill([...dummyBookmark]).flat();
   const totalDataCount = manyDummy.length;
   const [currentPage, setCurrentPage] = useState(1);
   const currentItems = manyDummy.slice((currentPage - 1) * 6, currentPage * 6);
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
         />
      </BookmarkBoxContainer>
   );
}

export default BookmarkBox;

const BookmarkBoxContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   margin-top: 10%;
   height: 800px;
   padding: 10px;
`;
