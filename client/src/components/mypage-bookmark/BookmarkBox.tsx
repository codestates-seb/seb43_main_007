import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BookmarkItem, { BookmartItemType } from "./BookmarkItem";
import BookmarkPagination from "./BookmarkPagination";
import { RootState } from "../../store/store";
import { getUserProfile } from "../../api/axios";
import { request } from "../../api/create";

function BookmarkBox() {
   const memberId = useSelector((state: RootState) => state.memberId);
   const [bookmarkBoardIds, setBookmarkBoardIds] = useState<number[]>([]);
   const [bookmarkItems, setBookmarkItems] = useState<BookmartItemType[]>([]);
   const [errorMessage, setErrorMessage] =
      useState("북마크된 글이 존재하지 않습니다.");
   // bookmark boardId 불러오기
   useEffect(() => {
      const fetchUserProfile = async () => {
         try {
            if (memberId) {
               const data = await getUserProfile(memberId);
               setBookmarkBoardIds([...data.bookmarkBoardIds]);
            }
         } catch (error) {
            setErrorMessage("서버 연결에 실패했습니다.");
         }
      };
      fetchUserProfile();
   }, [memberId]);

   // 북마크 게시글 하나하나 불러오기
   useEffect(() => {
      const getBookmark = async (bookmarkIds: number[]) => {
         try {
            const res = await Promise.all(
               bookmarkIds.map((boardId) =>
                  request.get(`/boards/board`, {
                     params: { memberId, boardId },
                  })
               )
            );
            setBookmarkItems(res.map((el) => el.data));
         } catch (error) {
            setErrorMessage("서버 연결에 실패했습니다.");
         }
      };
      getBookmark(bookmarkBoardIds);
   }, [memberId, bookmarkBoardIds]);

   const totalDataCount = bookmarkItems.length;
   const [currentPage, setCurrentPage] = useState(1);
   // 페이지당 item 개수
   const limitItems = 6;
   // 페이지당 item limitItems만큼 렌더링
   const currentItems = bookmarkItems.slice(
      (currentPage - 1) * limitItems,
      currentPage * limitItems
   );
   return (
      <BookmarkBoxContainer>
         {totalDataCount > 0 ? (
            currentItems.map((data) => {
               return <BookmarkItem key={data.boardId} data={data} />;
            })
         ) : (
            <div className="no-bookmark">{errorMessage}</div>
         )}
         <BookmarkPagination
            totalDataCount={totalDataCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            limitItems={limitItems}
         />
      </BookmarkBoxContainer>
   );
}

export default BookmarkBox;

const BookmarkBoxContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   padding-top: 5%;
   height: 1000px;
   .no-bookmark {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30%;
      font-size: 25px;
      color: var(--third-color3);
   }
`;
