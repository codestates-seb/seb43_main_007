import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../reducers/commentsSlice";
import Comment from "./Comment";
import { commentSuccess, commentError } from "../../util/toastify";
import useCommentCharacterCount from "../../hooks/useCommentCharacterCount";
import { DefaultButton } from "../mypage-profile/EditProfile";
import { createComment } from "../../api/axios";
import { RootState } from "../../store/store";

interface CommentListProps {
   boardId: number;
}

function CommentList({ boardId }: CommentListProps) {
   const dispatch = useDispatch();

   // 멤버 아이디
   const memberId = useSelector((state: RootState) => state.memberId);

   // 댓글
   const comments = useSelector((state: RootState) => state.comments.comments);

   // 대댓글 클릭된 댓글 Id
   const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
      null
   );

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
         const comment = response.data;
         commentSuccess();
         dispatch(addComment(comment));
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
                        handleReplyClick={handleReplyClick}
                        isReplySelected={isReplySelected}
                        boardId={boardId}
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
