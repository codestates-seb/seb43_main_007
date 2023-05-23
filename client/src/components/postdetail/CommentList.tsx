import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import { commentSuccess, commentError } from "../../util/toastify";
import useCommentCharacterCount from "../../hooks/useCommentCharacterCount";
import { DefaultButton } from "../mypage-profile/EditProfile";
import { createComment } from "../../api/axios";
import { RootState } from "../../store/store";

interface CommentListProps {
   comments?: any[];
   boardId: number;
   refreshPost: () => void;
}

function CommentList({
   comments: initialComments = [],
   boardId,
   refreshPost,
}: CommentListProps) {
   // 멤버 아이디
   const memberId = useSelector((state: RootState) => state.memberId);

   // 댓글 리스트
   const [comments, setComments] = useState(initialComments || []);

   const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
      null
   );

   useEffect(() => {
      if (initialComments) {
         setComments(initialComments);
      }
   }, [initialComments]);

   const handleReplySubmit = () => {
      commentSuccess();
   };

   const handleReplyClick = (commentId: number | null) => {
      setSelectedCommentId(commentId);
   };

   // 댓글 글자 수 알림
   const maxLength = 300;
   const { value, clearValue, characterCount, handleChange } =
      useCommentCharacterCount({
         maxLength,
      });

   // 댓글 등록 이벤트
   const handleCommentSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      const response = await createComment(memberId, boardId, value);
      if (response) {
         commentSuccess();
         setComments((prevComments) => [...prevComments, response.data]);
         clearValue();
      } else {
         commentError();
      }
   };

   return (
      <>
         <CreateCommentContainer>
            <CommentInputBox>
               <p className="letter-count">
                  {characterCount}/{maxLength}
               </p>
               <textarea
                  className="create-comment"
                  placeholder="댓글을 입력해주세요."
                  maxLength={maxLength}
                  value={value}
                  onChange={handleChange}
               />
            </CommentInputBox>
            <DefaultButton type="submit" onClick={handleCommentSubmit}>
               등록
            </DefaultButton>
         </CreateCommentContainer>
         <CommentListContainer>
            <ul className="comments">
               {comments.map((comment) => {
                  const isReplySelected =
                     selectedCommentId === comment.commentId;
                  return (
                     <Comment
                        key={comment.commentId}
                        comment={comment}
                        handleReplySubmit={handleReplySubmit}
                        handleReplyClick={handleReplyClick}
                        isReplySelected={isReplySelected}
                        boardId={boardId}
                        refreshPost={refreshPost}
                     />
                  );
               })}
            </ul>
         </CommentListContainer>
      </>
   );
}

export default CommentList;

export const CommentListContainer = styled.div`
   display: flex;
   flex-direction: column;

   .comments {
      padding: 0;
   }
`;

export const CreateCommentContainer = styled.div`
   background-color: var(--first-color2);
   border-bottom: 1px solid var(--light-gray);
   padding: 15px;
   display: flex;
   align-items: center;
   justify-content: space-between;
`;

export const CommentInputBox = styled.div`
   display: flex;
   align-items: center;

   .letter-count {
      font-size: 12px;
      width: 50px;
      text-align: end;
      margin-right: 10px;
      color: var(--dark-gray);
   }

   .create-comment {
      height: 50px;
      width: 895px;
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
