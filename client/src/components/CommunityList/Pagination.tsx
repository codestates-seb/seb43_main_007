import { useState, useEffect } from "react";
import styled from "styled-components";

type PaginationProps = {
   limit: number;
   totalPosts: number;
   page: number;
   setPage: React.Dispatch<React.SetStateAction<number>>;
};

function Pagination({ limit, totalPosts, page, setPage }: PaginationProps) {
   const totalPage = Math.ceil(totalPosts / limit);
   // console.log(limit);
   // console.log(totalPages);
   // const [currPage, setCurrPage] = useState(page);
   // const firstNum = currPage - (currPage % 5) + 1;
   // const lastNum = currPage - (currPage % 5) + 5;

   const [currentPageArray, setCurrentPageArray] = useState([]);
   const [totalPageArray, setTotalPageArray] = useState([]);

   const sliceArrayByLimit = (totalPage, limit) => {
      const totalPageArray = Array(totalPage)
         .fill()
         .map((_, i) => i);
      return Array(Math.ceil(totalPage / limit))
         .fill()
         .map(() => totalPageArray.splice(0, limit));
   };

   useEffect(() => {
      if (page % limit === 1) {
         setCurrentPageArray(totalPageArray[Math.floor(page / limit)]);
      } else if (page % limit === 0) {
         setCurrentPageArray(totalPageArray[Math.floor(page / limit) - 1]);
      }
   }, [page]);

   useEffect(() => {
      const slicedPageArray = sliceArrayByLimit(totalPage, limit);
      setTotalPageArray(slicedPageArray);
      setCurrentPageArray(slicedPageArray[0]);
   }, [totalPage]);

   return (
      <Divcontainer>
         <button
            type="button"
            onClick={() => setPage(1)}
            disabled={page === 1}
         />
         <button
            type="button"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
         />
         <div>
            {currentPageArray?.map((i) => (
               <button
                  type="button"
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  aria-current={page === i + 1 ? "page" : null}
               >
                  {i + 1}
               </button>
            ))}
         </div>
         <button
            type="button"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPage}
         />
         <button
            type="button"
            onClick={() => setPage(totalPage)}
            disabled={page === totalPage}
         />
      </Divcontainer>
   );
}

export default Pagination;

const Divcontainer = styled.div`
   display: flex;
   /* align-items: center; */
   justify-content: center;

   height: 30px;

   > div {
      width: 500px;

      > button {
         width: 50px;
         height: 50px;

         border: none;
         border-radius: 100px;
         background-color: transparent;
         :hover {
            background-color: #064420;
            color: white;
            cursor: pointer;
         }
      }
   }
`;
