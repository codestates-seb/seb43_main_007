import styled from "styled-components";
import useCommentCharacterCount from "../../hooks/useCommentCharacterCount";
import { DefaultButton } from "../mypage-profile/EditProfile";

function CreateComment() {
   const maxLength = 300;
   const { value, characterCount, handleChange } = useCommentCharacterCount({
      maxLength,
   });

   return (
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
         <DefaultButton>등록</DefaultButton>
      </CreateCommentContainer>
   );
}

export default CreateComment;

export const CreateCommentContainer = styled.div`
   background-color: var(--first-color2);
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
      border: 1px solid #dfdfdf;
      border-radius: 3px;

      &:focus {
         box-shadow: 0 0 0 2px rgba(0, 149, 255, 0.15);
         border: 1px solid var(--second-color3);
         outline: none;
      }
   }
`;
