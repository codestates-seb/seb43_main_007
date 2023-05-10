import styled from "styled-components";
import { useState } from "react";

function Pagination({
   setCurPage,
   curPage,
   totalPage,
   totalCount,
   size,
   pageCount,
}: PropsT) {
   const [pageGroup, setPageGroup] = useState(Math.ceil(curPage / pageCount)); // 몇번째 페이지그룹

   let lastNum = pageGroup * pageCount;
   if (lastNum > totalPage) {
      lastNum = totalPage;
   }
   const firstNum = lastNum - (pageCount - 1);

   const pagination = () => {
      const arr = [];
      for (let i = firstNum; i <= lastNum; i += 1) {
         arr.push(
            <button
               type="button"
               key={i}
               onClick={() => setCurPage(i)}
               // i={i}
               // curPage={curPage}
            >
               {i}
            </button>
         );
      }
      return arr;
   };

   return (
      <div>
         <button
            type="button"
            onClick={() => setPageGroup(pageGroup - 1)}
            disabled={firstNum === 1}
         >
            &lt;
         </button>
         {pagination()}
         <button
            type="button"
            onClick={() => {
               setPageGroup(pageGroup + 1);
            }}
            disabled={lastNum === totalPage}
         >
            &gt;
         </button>
      </div>
   );
}

export default Pagination;
