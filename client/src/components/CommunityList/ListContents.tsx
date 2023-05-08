import styled from "styled-components";
import { useState } from "react";
import ListContent from "./ListContent";
import data from "./dumyData";

import Pagination from "./Pagination";
import type { ListDataProps } from "./Listtypes";

function ListContents() {
   const [page, setPage] = useState(1);
   const limit = 10;
   const offset = (page - 1) * limit;

   const postsData = (posts: ListDataProps[]): ListDataProps[] => {
      if (posts) {
         const result = posts.slice(offset, offset + limit);
         return result;
      }
      return posts;
   };

   return (
      <DivContainer>
         <ul>
            {postsData(data).map((el: ListDataProps) => (
               <DivContent key={el.id}>
                  <ListContent datas={el} />
               </DivContent>
            ))}
         </ul>
         <Pagination
            limit={limit}
            totalPosts={data.length}
            page={page}
            setPage={setPage}
         />
      </DivContainer>
   );
}

const DivContainer = styled.div`
   border: 1px solid green;

   > ul {
      padding: 0px;
   }
`;

const DivContent = styled.div`
   display: flex;
   align-items: center;

   border: 1px solid yellow;
   height: 50px;

   margin: 30px 0px 30px 0px;
`;

export default ListContents;
