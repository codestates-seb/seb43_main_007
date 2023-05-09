import styled from "styled-components";
import { useState } from "react";
import ListContent from "./ListContent";
import data from "./dumyData";

import Pagination from "./Pagination";
import type { ListDataProps } from "./listTypes";

function ListContents() {
   const limit = 10;
   const [page, setPage] = useState(1);
   const offset = (page - 1) * limit;

   const postsData = (posts: ListDataProps[]): ListDataProps[] => {
      if (posts) {
         const result = posts.slice(offset, offset + limit);
         console.log(result);
         return result;
      }
      return posts;
   };

   return (
      <DivContainer>
         <div>
            <ul>
               {postsData(data).map((el: ListDataProps) => (
                  <DivContent key={el.id}>
                     <ListContent datas={el} />
                  </DivContent>
               ))}
            </ul>
         </div>
         <DivPagination>
            <Pagination
               limit={limit}
               totalPosts={data.length}
               page={page}
               setPage={setPage}
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

const DivContent = styled.div`
   display: flex;
   align-items: center;

   border-bottom: 1px solid black;
   height: 80px;
   width: 100%;

   margin: 30px 0px 30px 0px;
`;

const DivPagination = styled.div`
   border: 1px solid red;
   height: 50px;
`;

export default ListContents;
