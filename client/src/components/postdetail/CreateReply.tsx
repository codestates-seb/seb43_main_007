import useCommentCharacterCount from "../../hooks/useCommentCharacterCount";
import { CreateCommentContainer, CommentInputBox } from "./CreateComment";
import { DefaultButton } from "../mypage-profile/EditProfile";
import { createReply } from "../../api/axios";

export interface CreateReplyProps {
   onSubmit: (content: string) => void;
   onCancel: () => void;
   memberId: number;
   boardId: number;
   parentId: number;
}

function CreateReply({
   onSubmit,
   onCancel,
   memberId,
   boardId,
   parentId,
}: CreateReplyProps) {
   const maxLength = 300;
   const { value, characterCount, handleChange, clearValue } =
      useCommentCharacterCount({
         maxLength,
      });

   const handleReplySubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      const response = await createReply(memberId, value, boardId, parentId);
      if (response) {
         console.log("대댓글 생성 성공");
         onSubmit(value);
         clearValue();
         onCancel();
      } else {
         console.log("대댓글 생성 실패");
      }
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
