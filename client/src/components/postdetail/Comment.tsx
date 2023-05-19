import styled from "styled-components";
import CreateReply from "./CreateReply";
import Reply from "./Reply";
import { deleteComment } from "../../api/axios";

export interface CommentType {
   boardId: number;
   commentId: number;
   nickname: string;
   userPhoto: string;
   content: string;
   createdAt: string;
   parentId: number;
   replies?: CommentType[];
}

export interface CommentProps {
   comment: CommentType;
   handleReplySubmit: (commentId: number, content: string) => void;
   handleReplyClick: (commentId: number | null) => void;
   isReplySelected: boolean;
   memberId: number;
   boardId: number;
   // selectedCommentId: number | null;
}

function Comment({
   comment,
   handleReplySubmit,
   handleReplyClick,
   isReplySelected,
   memberId,
   boardId,
}: // selectedCommentId,
CommentProps) {
   const handleReplySubmitWrapper = (content: string) => {
      handleReplySubmit(comment.commentId, content);
   };

   const handleDelete = async () => {
      const response = await deleteComment(comment.commentId);
      if (response) {
         console.log("댓글 삭제 성공");
      } else {
         console.log("댓글 삭제 실패");
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
               <div className="comment-content">{comment.content}</div>
            </CommentContent>
            <DateAndReplyButton>
               <span className="comment-createdAt">{comment.createdAt}</span>
               <CommentButtonContainer>
                  <button type="submit" className="comment-btn">
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
               memberId={memberId}
               boardId={boardId}
               parentId={comment.commentId}
            />
         )}
         {comment.replies &&
            comment.replies.map((reply) => (
               <Reply key={reply.commentId} comment={reply} />
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
   height: 100%;
   margin-top: 3px;

   .comment-content {
      font-size: 13px;
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
