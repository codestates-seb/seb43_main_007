import styled, { css } from "styled-components";
import { useState, useEffect } from "react";

type PropsT = {
   setCurPage: React.Dispatch<React.SetStateAction<number>>;
   curPage: number;
   totalPage: number;
   limit: number;
};

type ActiveT = {
   key: number;
   onClick: () => void;
   i: number;
   curPage: number;
   "aria-current": string | undefined;
};

function Pagination({ setCurPage, curPage, totalPage, limit }: PropsT) {
   // 총 페이지 갯수에 따라 Pagination 갯수 정하기, limit 단위로 페이지 리스트 넘기기
   const [currentPageArray, setCurrentPageArray] = useState<number[]>([]);
   const [totalPageArray, setTotalPageArray] = useState<number[][]>([]);
   // const [idx, setIdx] = useState<number>();

   // 함수안에 인자, 변수명이 위에 상태와 동일해서 뒤에 1을 붙힘(명시적을 위해 함수를 같게하기위함)
   const sliceArrayByLimit = (totalPage1: number, limit1: number) => {
      const totalPageArray1 = Array(totalPage1)
         .fill(0)
         .map((_, i) => i);
      return Array(Math.ceil(totalPage1 / limit1))
         .fill(0)
         .map(() => totalPageArray1.splice(0, limit1));
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
         // 이부분을 넣어줘야지 마지막 페이지 가는 버튼을 누를때 마지막 페이지가 현재페이지로 인식이 된다.
         // 없으면 밑에 페이지가 이동을 안함(목록만 바뀐다.)
         setCurrentPageArray(totalPageArray[Math.floor(curPage / limit)]);
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
                  aria-current={curPage === i + 1 ? "page" : undefined}
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
