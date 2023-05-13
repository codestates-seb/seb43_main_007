import { CreateReplyProps } from "./postDetailTypes";
import useCommentCharacterCount from "../../hooks/useCommentCharacterCount";
import { CreateCommentContainer, CommentInputBox } from "./CreateComment";
import { DefaultButton } from "../mypage-profile/EditProfile";

function CreateReply({ onSubmit }: CreateReplyProps) {
   const maxLength = 300;
   const { value, characterCount, handleChange, clearValue } =
      useCommentCharacterCount({
         maxLength,
      });

   const handleReplySubmit = (event: React.FormEvent) => {
      event.preventDefault();
      onSubmit(value);
      clearValue();
   };

   return (
      <CreateCommentContainer>
         <CommentInputBox>
            <p className="letter-count">
               {characterCount}/{maxLength}
            </p>
            <textarea
               className="create-comment"
               placeholder="댓글에 대한 답글을 입력해주세요."
               maxLength={maxLength}
               value={value}
               onChange={handleChange}
            />
         </CommentInputBox>
         <DefaultButton onClick={handleReplySubmit}>등록</DefaultButton>
      </CreateCommentContainer>
   );
}

export default CreateReply;
