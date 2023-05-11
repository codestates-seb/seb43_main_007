import styled from "styled-components";
import { ChangeEvent, useState } from "react";
import { DefaultButton } from "../mypage-profile/EditProfile";

function CreateComment() {
   const [inputValue, setInputValue] = useState("");
   const maxLength = 300;
   const letterCount = inputValue.length;

   const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value.slice(0, maxLength);
      setInputValue(value);
   };
   return (
      <CreateCommentContainer>
         <CommentInputBox>
            <p className="letter-count">
               {letterCount}/{maxLength}
            </p>
            <textarea
               className="create-comment"
               placeholder="댓글을 입력해주세요."
               maxLength={maxLength}
               value={inputValue}
               onChange={handleInput}
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
   }
`;
