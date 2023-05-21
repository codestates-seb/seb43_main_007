import { useSelector } from "react-redux";
import useCommentCharacterCount from "../../hooks/useCommentCharacterCount";
import { CreateCommentContainer, CommentInputBox } from "./CreateComment";
import { DefaultButton } from "../mypage-profile/EditProfile";
import { createReply } from "../../api/axios";
import { RootState } from "../../store/store";

export interface CreateReplyProps {
   onSubmit: (content: string) => void;
   onCancel: () => void;
   boardId: number;
   parentId: number;
}

function CreateReply({
   onSubmit,
   onCancel,
   boardId,
   parentId,
}: CreateReplyProps) {
   const maxLength = 300;
   const { value, characterCount, handleChange, clearValue } =
      useCommentCharacterCount({
         maxLength,
      });

   const memberId = useSelector((state: RootState) => state.memberId);

   const handleReplySubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      const response = await createReply(boardId, value, memberId, parentId);
      if (response) {
         console.log("대댓글 생성 성공");
         onSubmit(value);
         clearValue();
         onCancel();
         window.location.reload();
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
