import styled from "styled-components";
import useCommentCharacterCount from "../../hooks/useCommentCharacterCount";
import { DefaultButton } from "../mypage-profile/EditProfile";
import { createComment } from "../../api/axios";

interface CreateCommentProps {
   memberId: number;
   boardId: number;
}

function CreateComment({ memberId, boardId }: CreateCommentProps) {
   const maxLength = 300;
   const { value, characterCount, handleChange } = useCommentCharacterCount({
      maxLength,
   });

   const handleCommentSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      const response = await createComment(memberId, boardId, value);
      if (response) {
         console.log("Comment submitted successfully");
      } else {
         console.log("Comment submission failed");
      }
   };

   return (
      <CreateCommentContainer>
         <form onSubmit={handleCommentSubmit}>
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
         </form>
      </CreateCommentContainer>
   );
}

export default CreateComment;

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
