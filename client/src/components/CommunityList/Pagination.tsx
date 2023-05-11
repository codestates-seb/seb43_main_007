import styled, { css } from "styled-components";
import { useState } from "react";

type PropsT = {
   setCurPage: React.Dispatch<React.SetStateAction<number>>;
   curPage: number;
   totalPage: number;
   totalCount: number;
   size: number;
   pageCount: number;
};

type ActiveT = {
   i: number;
   curPage: number;
};

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
            <PgBtn
               type="button"
               key={i}
               onClick={() => setCurPage(i)}
               i={i}
               curPage={curPage}
            >
               {i}
            </PgBtn>
         );
      }
      return arr;
   };

   return (
      <>
         <SideBtn
            type="button"
            onClick={() => setPageGroup(pageGroup - 1)}
            disabled={firstNum === 1}
         >
            &lt;
         </SideBtn>
         {pagination()}
         <SideBtn
            type="button"
            onClick={() => {
               setPageGroup(pageGroup + 1);
            }}
            disabled={lastNum === totalPage}
         >
            &gt;
         </SideBtn>
      </>
   );
}

export default Pagination;

const Button = styled.button`
   /* border-radius: 50px;
   width: 50px;
   height: 50px;

   border: 0;
   background-color: transparent;

   :hover {
      cursor: pointer;
      color: white;
      background-color: var(--first-color4);
   } */
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
      props.i === props.curPage &&
      css`
         color: white;
         background-color: var(--first-color4);
         font-weight: bold;
         cursor: revert;
         transform: revert;
      `}
`;
