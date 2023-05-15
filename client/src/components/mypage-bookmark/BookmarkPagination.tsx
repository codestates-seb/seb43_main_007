import styled from "styled-components";

interface Props {
   totalDataCount: number;
   currentPage: number;
   setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function BookmarkPagination({
   totalDataCount,
   currentPage,
   setCurrentPage,
}: Props) {
   const limitItems = 6;
   const maxPages = Math.ceil(totalDataCount / limitItems);
   const pageButtons = Array(5).fill(0);
   const handleButtonClick = (num: number) => {
      setCurrentPage(num);
      window.scrollTo(0, 0);
   };
   return (
      <BookmarkPaginationContainer>
         <button
            type="button"
            className="button prev"
            onClick={() => handleButtonClick(currentPage - 1)}
            disabled={currentPage <= 1}
         >
            Prev
         </button>
         {pageButtons.map((_, i) => {
            let key = i;
            if (maxPages > 5 && currentPage >= maxPages - 2)
               key = i + maxPages - 2 - currentPage;
            if (currentPage >= 4) key = i + currentPage - 3;
            if (key + 1 > maxPages) return null;
            return (
               <button
                  type="button"
                  className={`button ${
                     key + 1 === currentPage ? "active" : ""
                  }`}
                  key={key}
                  onClick={() => handleButtonClick(key + 1)}
                  disabled={key >= maxPages}
               >
                  {key + 1}
               </button>
            );
         })}
         <button
            type="button"
            className="button next"
            onClick={() => handleButtonClick(currentPage + 1)}
            disabled={currentPage >= maxPages}
         >
            Next
         </button>
      </BookmarkPaginationContainer>
   );
}

export default BookmarkPagination;

const BookmarkPaginationContainer = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   height: 90px;
   margin-left: 2%;
   .button.active {
      color: white;
      background-color: var(--third-color3);
   }
   div > .dot {
      margin: 0 0.5em;
   }
   .button {
      font-size: var(--font-large);
      margin: 0 0.2em;
      background-color: #fff;
      border: 1px solid #d9d9d9;
      border-radius: 3px;
      padding: 0.2em 0.5em;
      cursor: pointer;
      &:hover {
         background-color: #d9d9d9;
      }
      &:disabled {
         cursor: not-allowed;
      }
   }
   .prev,
   .next {
      width: 3.5em;
   }
`;
