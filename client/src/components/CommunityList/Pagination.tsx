import styled, { css } from "styled-components";
import { useState, useEffect } from "react";

type PropsT = {
   setCurPage: React.Dispatch<React.SetStateAction<number>>;
   curPage: number;
   totalPage: number;
   limit: number;
};

type ActiveT = {
   i: number;
   curPage: number;
};

function Pagination({ setCurPage, curPage, totalPage, limit }: PropsT) {
   // 총 페이지 갯수에 따라 Pagination 갯수 정하기, limit 단위로 페이지 리스트 넘기기
   const [currentPageArray, setCurrentPageArray] = useState([]);
   const [totalPageArray, setTotalPageArray] = useState([]);
   const [idx, setIdx] = useState<number>();

   const sliceArrayByLimit = (totalPage, limit) => {
      const totalPageArray = Array(totalPage)
         .fill(0)
         .map((_, i) => i);
      return Array(Math.ceil(totalPage / limit))
         .fill(0)
         .map(() => totalPageArray.splice(0, limit));
   };
   useEffect(() => {
      const slicedPageArray = sliceArrayByLimit(totalPage, limit);
      setTotalPageArray(slicedPageArray);
      setCurrentPageArray(slicedPageArray[0]);
   }, [totalPage, limit]);

   useEffect(() => {
      if (curPage % limit === 1) {
         setCurrentPageArray(totalPageArray[Math.floor(curPage / limit)]);
      } else if (curPage % limit === 0) {
         setCurrentPageArray(totalPageArray[Math.floor(curPage / limit) - 1]);
      } else {
         console.log("해당안됨");
         setCurrentPageArray(totalPageArray[Math.floor(curPage / limit)]);
         console.log(currentPageArray);
      }
   }, [curPage, totalPageArray]);

   return (
      <>
         <SideBtn onClick={() => setCurPage(1)} disabled={curPage === 1}>
            &lt;&lt;
         </SideBtn>
         <SideBtn
            onClick={() => setCurPage(curPage - 1)}
            disabled={curPage === 1}
         >
            &lt;
         </SideBtn>
         <div>
            {currentPageArray?.map((i) => (
               <PgBtn
                  key={i + 1}
                  onClick={() => setCurPage(i + 1)}
                  i={i}
                  curPage={curPage}
                  aria-current={curPage === i + 1 ? "page" : null}
               >
                  {i + 1}
               </PgBtn>
            ))}
         </div>
         <SideBtn
            onClick={() => setCurPage(curPage + 1)}
            disabled={curPage === totalPage}
         >
            &gt;
         </SideBtn>
         <SideBtn
            onClick={() => {
               setCurPage(totalPage);
            }}
            disabled={curPage === totalPage}
         >
            &gt;&gt;
         </SideBtn>
      </>
   );
}

export default Pagination;

const Button = styled.button`
   border: none;
   border-radius: 50px;
   width: 50px;
   height: 50px;
   padding: 8px;
   margin: 0;
   background: white;
   color: black;
   font-size: 1rem;
   &:hover {
      color: white;
      background: var(--first-color4);
      cursor: pointer;
      transform: translateY(-2px);
   }
   @media screen and (max-width: 480px) {
      padding: 6px;
      font-size: 0.8rem;
   }
`;

const SideBtn = styled(Button)`
   &[disabled] {
      background: #e7e5e5;
      cursor: revert;
      transform: revert;
   }
`;

const PgBtn = styled(Button)<ActiveT>`
   ${(props) =>
      props.i + 1 === props.curPage &&
      css`
         color: white;
         background-color: var(--first-color4);
         font-weight: bold;
         cursor: revert;
         transform: revert;
      `}
`;
