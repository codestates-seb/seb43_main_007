import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import ListContent from "./ListContent";
import Pagination from "./Pagination";
import type { PageInfo, ListData } from "./listTypes";
import { listData } from "../../api/axios";
import { RootState } from "../../store/store";
import ListSearch from "./ListSearch";
// import data from "./dumyData";

function ListContents() {
   // useParms사용하여 값을 가져와서 api에 넣어준다.
   // 라우팅페이지 파람 설정(/:파람) => Link to path걸어줄때 원하는 파람넣어주기(/파람) => 필요한 곳에서 useParams()값 가져오기
   const { cate } = useParams();

   // api로 가져온 데이터들
   const [datas, setDatas] = useState<ListData[]>([]);
   const [pageInfo, setPageInfo] = useState<PageInfo>();

   // // 페이지 네이션 필요한 상태 변수들
   const [curPage, setCurPage] = useState(1); // 현재 페이지
   const totalPage = pageInfo?.totalPages; // 전체 페이지
   const limit = 5; // 한화면 페이지 보일 수 페이지 5개 보임

   // 검색창 데이터 관리하는 상태변수(ListSearch 프롭)
   const [search, setSearch] = useState("");
   // 필터 검색 값 가져오는 상태변수(ListSearch 프롭)
   const [title, setTitle] = useState("제목");

   // 멤버 아이디 리덕스에서 가져오기
   // 비회원 일때는 멤버 아이디 0으로 => 로그인 되면 그 회원 아이디로 바뀌는 로직이다.(로그인에서 처리해줌)
   const memberId = useSelector((state: RootState) => state.memberId);

   // 서버에러 ui적으로 처리를 위한 변수
   const [isError, setIsError] = useState(false);
   // 데이터가 없다면 ui적으로 처리를 위한 변수
   const [isData, setIsData] = useState(false);

   // 드롭다운 카테고리 배열
   const titlesList: string[] = [];
   // 전체는 태그 추가 - 카테고리별 검색은 태그 삭제
   if (cate === undefined) {
      titlesList.push("제목", "내용", "태그", "제목+내용");
   } else {
      titlesList.push("제목", "내용", "제목+내용");
   }

   // list목록페이지 데이터 get요청
   const listDatas = async () => {
      setIsError(true);
      if (cate === undefined) {
         const data = await listData(curPage, `/${memberId}`, ``, ``, ``, ``);
         if (data.data.length === 0) {
            setIsData(false);
         } else {
            setIsData(true);
         }
         setDatas(data.data);
         setPageInfo(data.pageInfo);
      } else {
         const data = await listData(
            curPage,
            `/${memberId}`,
            `&cate=${cate}`,
            ``,
            ``,
            ``
         );
         if (data.data.length === 0) {
            setIsData(false);
         } else {
            setIsData(true);
         }
         setDatas(data.data);
         setPageInfo(data.pageInfo);
      }
   };

   useEffect(() => {
      listDatas().catch(() => {
         setIsError(false);
         console.log("서버에러");
      });
   }, [curPage, cate]);

   // 전체 curPage를 따라가다보니 다른 카테고리 페이지를 갈때 데이터가 없는 현상이 생김 => cate가 바뀔때 curPage를 1로 변경
   useEffect(() => {
      setCurPage(1);
   }, [cate]);

   // ListSearch 컴포넌트로 프롬내려주는 함수 (검색 get요청)
   const searchSubmitHandler = async () => {
      let data;
      if (cate === undefined) {
         if (title === "제목") {
            data = await listData(
               curPage,
               `/${memberId}`,
               ``,
               `&title=${search}`,
               "",
               ""
            );
         }
         if (title === "내용") {
            data = await listData(
               curPage,
               `/${memberId}`,
               "",
               "",
               `&content=${search}`,
               ""
            );
         }
         if (title === "제목+내용") {
            data = await listData(
               curPage,
               `/${memberId}`,
               "",
               `&title=${search}&`,
               `content=${search}`,
               ""
            );
         }
         if (title === "태그") {
            data = await listData(
               curPage,
               `/${memberId}`,
               "",
               ``,
               ``,
               `&tag=${search}`
            );
         }
      } else {
         if (title === "제목") {
            data = await listData(
               curPage,
               `/${memberId}`,
               `&cate=${cate}&`,
               `title=${search}`,
               "",
               ""
            );
         }
         if (title === "내용") {
            data = await listData(
               curPage,
               `/${memberId}`,
               `&cate=${cate}&`,
               "",
               `content=${search}`,
               ""
            );
         }
         if (title === "제목+내용") {
            data = await listData(
               curPage,
               `/${memberId}`,
               `&cate=${cate}&`,
               `title=${search}&`,
               `content=${search}`,
               ""
            );
         }
      }
      // 검색하면 새로운 데이터가 담길 수 있게함
      setDatas(data.data);
      setPageInfo(data.pageInfo);
      setSearch("");
   };

   return (
      <DivContainer>
         <ListSearch
            search={search}
            setSearch={setSearch}
            setTitle={setTitle}
            title={title}
            searchSubmitHandler={searchSubmitHandler}
            titlesList={titlesList}
         />
         <div className="postList-div">
            {isError ? (
               isData ? (
                  <ul>
                     {datas.map((el: ListData) => (
                        <ListContent key={el.boardId} userDatas={el} />
                     ))}
                  </ul>
               ) : (
                  <div className="error dataNull">게시글이 없습니다</div>
               )
            ) : (
               <div className="error server">
                  서버에러가 있습니다. 새로고침 혹은 잠시후 다시 시도해주세요.
               </div>
            )}
         </div>
         <DivPagination>
            {totalPage ? (
               <Pagination
                  totalPage={totalPage}
                  limit={limit}
                  curPage={curPage}
                  setCurPage={setCurPage}
               />
            ) : null}
         </DivPagination>
      </DivContainer>
   );
}

const DivContainer = styled.div`
   margin-left: 30px;

   @media (max-width: 1023px) {
      width: 700px;
   }

   > div > ul {
      padding: 0px;
   }

   .error {
      display: flex;
      justify-content: center;

      margin-top: 50px;
      color: #d2d2d2;
   }
`;

const DivPagination = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   height: 50px;

   margin-top: 30px;
`;

export default ListContents;
