import { useState } from "react";
import styled from "styled-components";
import { RiSeedlingLine, RiSeedlingFill } from "react-icons/ri";
import { BsPin, BsPinFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store/store";
import type { ListData } from "./listTypes";
import { likePatch, bookMarkPost, pinPost } from "../../api/axios";

function ListContent({ userDatas }: { userDatas: ListData }) {
   // 관리자(매니저)인지 (로컬에서 관리?)
   const [isManager, setIsManager] = useState(false);
   // 에디터 픽 유무(리덕스 관리?)-리덕스 툴킷으로 로컬할 수 있는거 찾아보기
   const [isEditerPick, setIsEditerPick] = useState(false);
   // 고정 유무(리덕스 툴킷으로 관리?)
   const [isFixPin, setIsFixPin] = useState(userDatas.pin);
   const [isFixPinNumber, setIsFixPinNumber] = useState(0);
   // 좋아요 유무
   const [isLike, setIsLike] = useState(userDatas.like);
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
   console.log(memberId);

   // 좋아요 클릭 이벤트
   const likeClickHandler = () => {
      const req = {
         memberId,
         boardId: userDatas.boardId,
         boardLike: isLike,
      };
      if (isLike === 0) {
         setIsLike(1);
         likePatch(req);
      } else if (isLike === 1) {
         setIsLike(0);
         likePatch(req);
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
                  <Link to={`/post/${userDatas.boardId}`}>
                     <span>{userDatas.title}</span>
                  </Link>
               </div>
               {/* 프로필+이름 / 고정 */}
               <div className="div-author">
                  {isManager ? (
                     isFixPin ? (
                        <DivImg>
                           <BsPinFill size="25" color="green" />
                        </DivImg>
                     ) : (
                        <DivImg>
                           <BsPin size="25" />
                        </DivImg>
                     )
                  ) : isFixPin ? (
                     <DivImg onClick={pinFixClickHandler}>
                        <BsPinFill size="25" color="green" />
                     </DivImg>
                  ) : (
                     <DivImg onClick={pinFixClickHandler}>
                        <BsPin size="25" />
                     </DivImg>
                  )}
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
                     <button type="button" onClick={likeClickHandler}>
                        {isLike ? (
                           <AiFillHeart size="25" color="red" />
                        ) : (
                           <AiOutlineHeart size="25" />
                        )}
                     </button>
                     <button type="button" onClick={bookMarkClickHandler}>
                        {isBookMark ? (
                           <RiSeedlingFill size="25" color="green" />
                        ) : (
                           <RiSeedlingLine size="25" />
                        )}
                     </button>
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

const DivContainer = styled.div<{ isFixPin: boolean }>`
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
      width: 30px;
   }

   .div-title {
      width: 500px;

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
      justify-content: space-between;
      align-items: center;

      font-size: 12px;
      color: #6b728e;

      height: 60px;
   }
   .div-createdAt {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      font-size: 12px;
      color: #6b728e;

      height: 60px;
   }
`;

const DivEditerPick = styled.div`
   width: 100px;
   height: 20px;
   border-radius: 5px;
   background-color: #e0ede4;
   color: #083c1f;
`;

const DivAuthor = styled.div`
   display: flex;
   align-items: center;
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
