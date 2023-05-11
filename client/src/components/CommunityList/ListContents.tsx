import styled from "styled-components";
import { useState } from "react";
import ListContent from "./ListContent";
import data from "./dumyData";

import Pagination from "./Pagination";
import type { ListDataProps } from "./Listtypes";

function ListContents() {
   const [curPage, setCurPage] = useState(1);
   const totalCount = data.length;
   const size = 10;
   const totalPage = Math.ceil(totalCount / size);
   const pageCount = 5;
   const offset = (curPage - 1) * size;

   return (
      <DivContainer>
         <div>
            <ul>
               {data.slice(offset, offset + size).map((el: ListDataProps) => (
                  <ListContent key={el.id} datas={el} />
               ))}
            </ul>
         </div>
         <DivPagination>
            <Pagination
               curPage={curPage}
               setCurPage={setCurPage}
               totalPage={totalPage}
               totalCount={totalCount}
               size={size}
               pageCount={pageCount}
            />
         </DivPagination>
      </DivContainer>
   );
}

const DivContainer = styled.div`
   /* border: 1px solid green; */
   width: 1050px;
   margin-left: 30px;

   > div > ul {
      padding: 0px;
   }
`;

const DivPagination = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   height: 50px;
`;

export default ListContents;
