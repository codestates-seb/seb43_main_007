import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import CreateReply from "./CreateReply";
import Reply from "./Reply";
import { editComment, deleteComment } from "../../api/axios";
import { RootState } from "../../store/store";
import { CommentType } from "./commentType";

export interface CommentProps {
   comment: CommentType;
   handleReplySubmit: (commentId: number, content: string) => void;
   handleReplyClick: (commentId: number | null) => void;
   isReplySelected: boolean;
   boardId: number;
}

function Comment({
   comment,
   handleReplySubmit,
   handleReplyClick,
   isReplySelected,
   boardId,
}: CommentProps) {
   const handleReplySubmitWrapper = (content: string) => {
      handleReplySubmit(comment.commentId, content);
   };

   // memberId
   const memberId = useSelector((state: RootState) => state.memberId);
   // 닉네임
   const myNickname = useSelector(
      (state: RootState) => state.profileNickname.nickname
   );

   // 댓글 날짜 display
   const commentDate = comment.createdAt.slice(0, 10);
   const commentTime = comment.createdAt.slice(12, 16);

   // 댓글 수정
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
         console.log("댓글 수정 성공");
         setIsEditing(false);
         window.location.reload();
      } else {
         console.log("댓글 수정 실패");
      }
   };

   const handleEditCancelClick = () => {
      setEditedComment(comment.content);
      setIsEditing(false);
   };

   // 댓글 삭제
   const handleDelete = async () => {
      const response = await deleteComment(comment.commentId);
      if (response) {
         console.log("댓글 삭제 성공");
         window.location.reload();
      }
   };

   return (
      <>
         <CommentContainer>
            <AuthorInfoContainer>
               <AuthorInfo>
                  <img
                     src={comment.userPhoto}
                     alt="comment-author-profile"
                     className="comment-author-img"
                  />
                  <span className="comment-author">{comment.nickname}</span>
               </AuthorInfo>
            </AuthorInfoContainer>
            <CommentContent>
               {isEditing ? (
                  <textarea
                     className="comment-edit"
                     value={editedComment}
                     onChange={(e) => setEditedComment(e.target.value)}
                  />
               ) : (
                  <div className="comment-content">{comment.content}</div>
               )}
            </CommentContent>
            <DateAndReplyButton>
               <span className="comment-createdAt">
                  {commentDate} {commentTime}
               </span>
               <CommentButtonContainer>
                  {isEditing ? (
                     <>
                        <button
                           type="submit"
                           className="comment-btn"
                           onClick={handleEditSaveClick}
                        >
                           등록
                        </button>
                        <span>|</span>
                        <button
                           type="submit"
                           className="comment-btn comment-delete-btn"
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
                              className="comment-btn"
                              onClick={() => setIsEditing(true)}
                           >
                              수정
                           </button>
                           <span>|</span>
                           <button
                              type="submit"
                              className="comment-btn comment-delete-btn"
                              onClick={handleDelete}
                           >
                              삭제
                           </button>
                        </>
                     )
                  )}
               </CommentButtonContainer>
               <ReplyButton
                  onClick={() =>
                     handleReplyClick(
                        isReplySelected ? null : comment.commentId
                     )
                  }
               >
                  {isReplySelected ? "취소" : "댓글 추가"}
               </ReplyButton>
            </DateAndReplyButton>
         </CommentContainer>
         {isReplySelected && (
            <CreateReply
               onSubmit={handleReplySubmitWrapper}
               onCancel={() => handleReplyClick(null)}
               boardId={boardId}
               parentId={comment.commentId}
            />
         )}
         {comment.replies &&
            comment.replies.map((reply) => (
               <Reply key={reply.commentId} comment={reply} boardId={boardId} />
            ))}
      </>
   );
}

export default Comment;

export const CommentContainer = styled.li`
   width: 100%;
   padding: 10px 0 10px 15px;
   border-bottom: 1px solid var(--light-gray);
   display: flex;
   justify-content: space-between;
`;

export const AuthorInfoContainer = styled.div`
   height: 100%;
`;

export const AuthorInfo = styled.div`
   display: flex;
   align-items: center;
   width: 140px;

   .comment-author-img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-right: 5px;
   }
   .comment-author {
      font-size: 12px;
   }
`;

export const CommentContent = styled.div`
   width: 790px;
   margin-top: 3px;

   .comment-content {
      font-size: 13px;
   }

   .comment-edit {
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

export const DateAndReplyButton = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: flex-end;
   height: 100%;
   font-size: 12px;
   width: 120px;
   margin-top: 3px;
`;

export const CommentButtonContainer = styled.div`
   display: flex;
   align-items: center;
   margin-top: 5px;

   .comment-btn {
      border: none;
      background-color: transparent;
      font-size: 12px;
      cursor: pointer;
   }

   .comment-delete-btn {
      padding-right: 0;
   }
`;

export const ReplyButton = styled.button`
   border: none;
   padding: 0;
   background-color: transparent;
   cursor: pointer;
   margin-top: 5px;
   font-size: 12px;
`;
