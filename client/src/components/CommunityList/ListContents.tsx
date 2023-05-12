import styled from "styled-components";
import { useState, useEffect } from "react";
import ListContent from "./ListContent";
import Pagination from "./Pagination";
import type { PageInfo, ListData } from "./listtypes";
import { listData } from "../../api/axios";
// import data from "./dumyData";

function ListContents() {
   // api로 가져온 데이터들
   const [datas, setDatas] = useState<ListData[]>([]);
   const [pageInfo, setPageInfo] = useState<PageInfo>();

   // // 페이지 네이션 필요한 상태 변수들
   const [curPage, setCurPage] = useState(1); // 현재 페이지
   const totalPage = pageInfo?.totalPages; // 전체 페이지
   const limit = 5; // 한화면 페이지 보일 수 페이지 5개 보임

   // list목록페이지 데이터 get요청
   const listDatas = async () => {
      const data = await listData(curPage);
      setDatas(data.data);
      setPageInfo(data.pageInfo);
   };

   useEffect(() => {
      listDatas();
   }, [curPage]);

   return (
      <DivContainer>
         <div>
            <ul>
               {datas.map((el: ListData) => (
                  <ListContent key={el.boardId} userDatas={el} />
               ))}
            </ul>
         </div>
         <DivPagination>
            {totalPage && (
               <Pagination
                  totalPage={totalPage}
                  limit={limit}
                  curPage={curPage}
                  setCurPage={setCurPage}
               />
            )}
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
