import { useState } from "react";
import styled from "styled-components";
import { RiSeedlingLine, RiSeedlingFill } from "react-icons/ri";
import { BsPin, BsPinFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store/store";
import type { ListData } from "./listTypes";
import { likePost, bookMarkPost, pinPost } from "../../api/axios";

function ListContent({ userDatas }: { userDatas: ListData }) {
   // 관리자(매니저)인지 유저인지(리덕스로 불러오기-리덕스로 전역관리 로그인에서 처리)
   const isAdmin = useSelector((state: RootState) => state.isAdmin);

   // 에디터 픽 유무(리덕스 관리?)-리덕스 툴킷으로 로컬할 수 있는거 찾아보기
   // const [isEditerPick, setIsEditerPick] = useState(false);
   const isEditerPick = userDatas.pick;
   // const [isEditerPick, setIsEditerPick] = useState(userDatas.pick);
   // 고정 유무(리덕스 툴킷으로 관리?)
   const [isFixPin, setIsFixPin] = useState(userDatas.pin);
   // 좋아요 유무
   const [isLike, setIsLike] = useState(userDatas.likeCheck);
   // 즐겨찾기(북마크) 유무
   const [isBookMark, setIsBookMark] = useState(userDatas.bookmark);

   // 고정 클릭 이벤트
   const pinFixClickHandler = () => {
      if (isFixPin === 0) {
         setIsFixPin(1);
         pinPost(userDatas.boardId);
      } else if (isFixPin === 1) {
         setIsFixPin(0);
         pinPost(userDatas.boardId);
      }
   };

   // --- 리덕스 store에서 가져온 멤버 id값
   const memberId = useSelector((state: RootState) => state.memberId);

   // 좋아요 클릭 이벤트
   const likeClickHandler = () => {
      const req = {
         memberId,
         boardId: userDatas.boardId,
      };
      if (isLike === 0) {
         setIsLike(1);
         likePost(req);
      } else if (isLike === 1) {
         setIsLike(0);
         likePost(req);
      }
   };

   // 북마크 클릭 이벤트
   const bookMarkClickHandler = () => {
      const req = {
         memberId,
         boardId: userDatas.boardId,
      };
      if (isBookMark === 0) {
         setIsBookMark(1);
         bookMarkPost(req);
      } else if (isBookMark === 1) {
         setIsBookMark(0);
         bookMarkPost(req);
      }
   };

   return (
      <DivContainer isFixPin={isFixPin}>
         <Li>
            <DivContent>
               {/* 썸네일 */}
               <div className="div-img">
                  <img
                     src={`${userDatas.photo}`}
                     alt="로고이미지"
                     style={{ width: "70px" }}
                  />
               </div>
               {/* 에디터픽 + 제목 */}
               <div className="div-title">
                  {isEditerPick ? (
                     <DivEditerPick className="editer">{`Editer's Pick`}</DivEditerPick>
                  ) : null}
                  {memberId ? (
                     <Link to={`/post/${userDatas.boardId}`}>
                        <span>{userDatas.title}</span>
                     </Link>
                  ) : (
                     <Link to="/login">
                        <span>{userDatas.title}</span>
                     </Link>
                  )}
               </div>
               {/* 프로필+이름 / 고정 */}
               <div className="div-author">
                  {isAdmin ? (
                     isFixPin ? (
                        <DivImg onClick={pinFixClickHandler}>
                           <BsPinFill size="25" color="green" />
                        </DivImg>
                     ) : (
                        <DivImg onClick={pinFixClickHandler}>
                           <BsPin size="25" />
                        </DivImg>
                     )
                  ) : isFixPin ? (
                     <DivImg>
                        <BsPinFill size="25" color="green" />
                     </DivImg>
                  ) : // <DivImg>
                  //    <BsPin size="25" />
                  // </DivImg>
                  null}
                  {/* 프로필+이름 */}
                  <DivAuthor>
                     <span>
                        <img
                           src={`${userDatas.userPhoto}`}
                           alt="로고이미지"
                           style={{ width: "30px" }}
                        />
                     </span>
                     <span>{userDatas.nickName}</span>
                  </DivAuthor>
               </div>
               {/* 날짜 / 좋아요 + 북마크 */}
               <div className="div-createdAt">
                  <DivImg>
                     {/* 멤버(회원)이면/아니면 예외처리 좋아요 */}
                     {memberId ? (
                        <button type="button" onClick={likeClickHandler}>
                           {isLike ? (
                              <AiFillHeart size="25" color="red" />
                           ) : (
                              <AiOutlineHeart size="25" />
                           )}
                        </button>
                     ) : (
                        <span>
                           {isLike ? (
                              <AiFillHeart size="25" color="red" />
                           ) : (
                              <AiOutlineHeart size="25" />
                           )}
                        </span>
                     )}
                     {/* 멤버(회원)이면/아니면 예외처리 북마크 */}
                     {memberId ? (
                        <button type="button" onClick={bookMarkClickHandler}>
                           {isBookMark ? (
                              <RiSeedlingFill size="25" color="green" />
                           ) : (
                              <RiSeedlingLine size="25" />
                           )}
                        </button>
                     ) : (
                        <span>
                           {isBookMark ? (
                              <RiSeedlingFill size="25" color="green" />
                           ) : (
                              <RiSeedlingLine size="25" />
                           )}
                        </span>
                     )}
                  </DivImg>
                  {/* 날짜 */}
                  <div>{userDatas.now.slice(0, 10)}</div>
               </div>
            </DivContent>
         </Li>
      </DivContainer>
   );
}

export default ListContent;

const DivContainer = styled.div<{ isFixPin: number }>`
   display: flex;
   align-items: center;

   border-bottom: 1px solid black;
   height: 80px;
   width: 100%;

   margin: 30px 0px 30px 0px;

   background-color: ${({ isFixPin }) => (isFixPin ? "#feffde" : "null")};
`;

const Li = styled.li`
   width: 100%;
`;

const DivContent = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   width: 100%;

   .div-img {
      width: 100px;
      margin-right: 50px;
   }

   .div-title {
      width: 500px;
      margin-right: 50px;

      @media (max-width: 1023px) {
         width: 200px;
      }
      div {
         font-size: var(--font-large);
      }

      a {
         text-decoration: none;
         color: black;
         :hover {
            color: var(--first-color4);
            text-decoration: underline;
         }
      }
   }
   .div-author {
      display: flex;
      flex-direction: column;

      font-size: 12px;
      color: #6b728e;

      height: 100%;
      width: 100px;
      margin-right: 50px;

      @media (max-width: 1023px) {
         width: 100px;
      }
   }
   .div-createdAt {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      font-size: 12px;
      color: #6b728e;

      height: 60px;
      width: 100px;
   }
`;

const DivAuthor = styled.div`
   display: flex;
   align-items: center;

   margin-top: 8px;
`;

const DivImg = styled.div`
   display: flex;
   cursor: pointer;

   > button {
      border: 0px;
      background-color: transparent;

      cursor: pointer;
   }
`;
