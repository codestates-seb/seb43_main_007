import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { CommentType } from "./commentType";
import { deleteComment, editComment } from "../../api/axios";
import { RootState } from "../../store/store";
import { updateReply, deleteReply } from "../../reducers/commentsSlice";
import {
   commentEditSuccess,
   commentEditError,
   commentDeleteSuccess,
   commentDeleteError,
} from "../../util/toastify";

export interface ReplyProps {
   comment: CommentType;
   boardId: number;
   parentId: number;
}

function Reply({ comment, boardId, parentId }: ReplyProps) {
   const dispatch = useDispatch();

   // memberId
   const memberId = useSelector((state: RootState) => state.memberId);

   // 닉네임
   const myNickname = useSelector(
      (state: RootState) => state.profileNickname.nickname
   );

   // 대댓글 날짜 display
   const commentDate = comment.createdAt.slice(0, 10);
   const commentTime = comment.createdAt.slice(12, 16);

   // 대댓글 수정
   const [isEditing, setIsEditing] = useState(false);
   const [editedComment, setEditedComment] = useState(comment.content);

   const handleEditSaveClick = async () => {
      const response = await editComment(
         boardId,
         comment.commentId,
         memberId,
         editedComment
      );
      if (response) {
         commentEditSuccess();
         setIsEditing(false);
         dispatch(
            updateReply({
               commentId: parentId,
               reply: { ...comment, content: response.content },
            })
         );
      } else {
         commentEditError();
      }
   };

   const handleEditCancelClick = () => {
      setEditedComment(comment.content);
      setIsEditing(false);
   };

   // 대댓글 삭제
   const handleDelete = async () => {
      try {
         await deleteComment(comment.commentId);
         commentDeleteSuccess();
         dispatch(
            deleteReply({
               commentId: parentId,
               replyCommentId: comment.commentId,
            })
         );
      } catch (error) {
         commentDeleteError();
      }
   };

   return (
      <ReplyContainer>
         <ReplyBox>
            <ReplyAuthorInfoContainer>
               <ReplyAuthorInfo>
                  <img
                     src={comment.userPhoto}
                     alt="reply-author-img"
                     className="reply-author-img"
                  />
                  <span className="reply-author">{comment.nickname}</span>
               </ReplyAuthorInfo>
            </ReplyAuthorInfoContainer>
            <ReplyContent>
               {isEditing ? (
                  <textarea
                     className="reply-edit"
                     value={editedComment}
                     onChange={(e) => setEditedComment(e.target.value)}
                  />
               ) : (
                  <div className="reply-content">{comment.content}</div>
               )}
            </ReplyContent>
            <DateAndButton>
               <span className="reply-createdAt">
                  {commentDate} {commentTime}
               </span>
               <ReplyButtonContainer>
                  {isEditing ? (
                     <>
                        <button
                           type="submit"
                           className="reply-btn"
                           onClick={handleEditSaveClick}
                        >
                           등록
                        </button>
                        <span>|</span>
                        <button
                           type="submit"
                           className="reply-btn reply-delete-btn"
                           onClick={handleEditCancelClick}
                        >
                           취소
                        </button>
                     </>
                  ) : (
                     comment.nickname === myNickname && (
                        <>
                           <button
                              type="submit"
                              className="reply-btn"
                              onClick={() => setIsEditing(true)}
                           >
                              수정
                           </button>
                           <span>|</span>
                           <button
                              type="submit"
                              className="reply-btn reply-delete-btn"
                              onClick={handleDelete}
                           >
                              삭제
                           </button>
                        </>
                     )
                  )}
               </ReplyButtonContainer>
            </DateAndButton>
         </ReplyBox>
      </ReplyContainer>
   );
}

export default Reply;

export const ReplyContainer = styled.li`
   width: 100%;
   padding: 10px 0 10px 15px;
   border-bottom: 1px solid var(--light-gray);
`;

export const ReplyBox = styled.div`
   margin-left: 150px;
   display: flex;
   justify-content: space-between;

   .reply-createdAt {
      font-size: 12px;
   }
`;

export const ReplyAuthorInfoContainer = styled.div`
   height: 100%;
`;

export const ReplyAuthorInfo = styled.div`
   display: flex;
   align-items: center;
   width: 140px;

   .reply-author-img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-right: 5px;
   }
   .reply-author {
      font-size: 12px;
   }
`;

export const ReplyContent = styled.div`
   width: 640px;
   height: 100%;
   margin-top: 3px;

   .reply-content {
      font-size: 13px;
   }

   .reply-edit {
      font-size: 13px;
      width: 100%;
      height: 100%;
      resize: none;
      border: 1px solid var(--light-gray);
      border-radius: 3px;

      &:focus {
         box-shadow: 0 0 0 2px rgba(0, 149, 255, 0.15);
         border: 1px solid var(--second-color3);
         outline: none;
      }
   }
`;

export const DateAndButton = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: flex-end;
   height: 100%;
   font-size: 12px;
   width: 120px;
   margin-top: 3px;
`;

export const ReplyButtonContainer = styled.div`
   display: flex;
   align-items: center;
   margin-top: 5px;

   .reply-btn {
      border: none;
      background-color: transparent;
      font-size: 12px;
      cursor: pointer;
   }

   .reply-delete-btn {
      padding-right: 0;
   }
`;
