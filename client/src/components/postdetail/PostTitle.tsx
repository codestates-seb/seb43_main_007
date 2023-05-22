import styled from "styled-components";
import { RiSeedlingLine, RiSeedlingFill } from "react-icons/ri";
import { BsPin, BsPinFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import { RootState } from "../../store/store";
import { likePost, bookMarkPost, pinPost, editorPick } from "../../api/axios";

export interface PostTitleProps {
   boardId: number;
   title: string;
   now: string;
   pick: number;
   pin: number;
   likeCheck: number;
   likeCount: number;
   bookmark: number;
   nickName: string;
   userPhoto: string;
   comments?: any[];
}

function PostTitle({
   boardId,
   title,
   now,
   pick,
   pin,
   likeCheck,
   likeCount,
   bookmark,
   nickName,
   userPhoto,
   comments,
}: PostTitleProps) {
   const memberId = useSelector((state: RootState) => state.memberId);
   const isAdmin = useSelector((state: RootState) => state.isAdmin);

   // 고정 유무
   const [isFixPin, setIsFixPin] = useState(pin);
   // 좋아요
   const [isLike, setIsLike] = useState(likeCheck);
   const [heartCount, setHeartCount] = useState(likeCount);
   // 즐겨찾기(북마크) 유무
   const [isBookMark, setIsBookMark] = useState(bookmark);

   // 채택 클릭 이벤트
   const editorPickHandler = () => {
      if (pick === 0) {
         editorPick(boardId);
      } else if (pick === 1) {
         editorPick(boardId);
      }
   };

   const navigate = useNavigate();

   // 고정 클릭 이벤트
   const pinFixClickHandler = () => {
      if (isFixPin === 0) {
         navigate(``); // 관리자 수정페이지로
      } else if (isFixPin === 1) {
         setIsFixPin(0);
         pinPost(boardId);
      }
   };

   // 좋아요 클릭 이벤트
   const likeClickHandler = async () => {
      const req = {
         memberId,
         boardId,
      };
      if (isLike === 0) {
         setIsLike(1);
         const success = await likePost(req);
         if (success) {
            setHeartCount(heartCount + 1);
         }
      } else if (isLike === 1) {
         setIsLike(0);
         const success = await likePost(req);
         if (success) {
            setHeartCount(heartCount - 1);
         }
      }
   };

   // 북마크 클릭 이벤트
   const bookMarkClickHandler = () => {
      const req = {
         memberId,
         boardId,
      };
      if (isBookMark === 0) {
         setIsBookMark(1);
         bookMarkPost(req);
      } else if (isBookMark === 1) {
         setIsBookMark(0);
         bookMarkPost(req);
      }
   };

   // 게시글 날짜 및 시간 display
   const postDate = now.slice(0, 10);
   const postTime = now.slice(11, 16);

   // 좋아요 총 개수
   let numTotalComments = comments ? comments.length : 0;
   if (comments) {
      comments.forEach((comment) => {
         numTotalComments += comment.replies.length;
      });
   }

   return (
      <PostTitleContainer>
         <TopTitleContainer>
            <TitleBadgeContainer>
               {pick === 1 && <EditorPick>Editor&apos;s Pick</EditorPick>}
               <h1 className="post-title">{title}</h1>
            </TitleBadgeContainer>
            <MarkContainer>
               {isAdmin && (
                  <>
                     {pick === 0 ? (
                        <button
                           type="submit"
                           className="pick-btn unpicked"
                           onClick={editorPickHandler}
                        >
                           채택
                        </button>
                     ) : (
                        <button
                           type="submit"
                           className="pick-btn picked"
                           onClick={editorPickHandler}
                        >
                           채택
                        </button>
                     )}
                     {isFixPin ? (
                        <BsPinFill
                           className="mark-icon pin-filled-icon"
                           onClick={pinFixClickHandler}
                        />
                     ) : (
                        <BsPin
                           className="mark-icon"
                           onClick={pinFixClickHandler}
                        />
                     )}
                  </>
               )}
               {isLike ? (
                  <AiFillHeart
                     className="mark-icon like-filled-icon"
                     onClick={likeClickHandler}
                  />
               ) : (
                  <AiOutlineHeart
                     className="mark-icon like-icon"
                     onClick={likeClickHandler}
                  />
               )}
               {isBookMark ? (
                  <RiSeedlingFill
                     className="mark-icon bookmark-filled-icon"
                     onClick={bookMarkClickHandler}
                  />
               ) : (
                  <RiSeedlingLine
                     className="mark-icon"
                     onClick={bookMarkClickHandler}
                  />
               )}
            </MarkContainer>
         </TopTitleContainer>
         <BottomTitleContainer>
            <AuthorDateContainer>
               <img
                  src={userPhoto}
                  className="author-img"
                  alt="author-img"
                  style={{
                     width: "20px",
                     height: "20px",
                     borderRadius: "50%",
                  }}
               />
               <span className="author-date">
                  {nickName} | {postDate} {postTime}
               </span>
            </AuthorDateContainer>
            <span className="likes-comments">
               좋아요 {heartCount} | 댓글 {numTotalComments}
            </span>
         </BottomTitleContainer>
      </PostTitleContainer>
   );
}

export default PostTitle;

export const PostTitleContainer = styled.div`
   background-color: var(--first-color2);
   padding: 15px;
`;

export const TopTitleContainer = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 15px;
`;

export const TitleBadgeContainer = styled.div`
   display: flex;

   .post-title {
      font-size: 18px;
      margin: 0;
   }
`;

export const EditorPick = styled.div`
   width: 100px;
   height: 20px;
   font-size: 13px;
   text-align: center;
   line-height: 18px;
   border-radius: 5px;
   margin-right: 10px;
   background-color: var(--first-color3);
   color: var(--first-color4);
   border: 1px solid #c4dccb;
   font-weight: 700;
`;

export const MarkContainer = styled.div`
   display: flex;
   justify-content: flex-end;
   width: 180px;

   .pick-btn {
      font-size: 12px;
      border: 1px solid black;
      border-radius: 3px;
      color: black;
      background-color: transparent;
      cursor: pointer;
      margin-right: 5px;
   }

   .picked {
      background-color: #c2dbca;
   }

   .mark-icon {
      font-size: 23px;
      cursor: pointer;
   }

   .pin-icon {
      margin-right: 5px;
   }

   .pin-filled-icon {
      color: green;
      margin-right: 5px;
   }

   .like-icon {
      margin-right: 5px;
   }

   .like-filled-icon {
      color: red;
      margin-right: 5px;
   }

   .bookmark-filled-icon {
      color: green;
   }
`;

export const BottomTitleContainer = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   font-size: 12px;
`;

export const AuthorDateContainer = styled.div`
   display: flex;
   align-items: center;

   .author-date {
      margin-left: 5px;
   }
`;
