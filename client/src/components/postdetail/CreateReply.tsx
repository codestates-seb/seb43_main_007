import styled from "styled-components";
import { useSelector } from "react-redux";
import useCommentCharacterCount from "../../hooks/useCommentCharacterCount";
import { DefaultButton } from "../mypage-profile/EditProfile";
import { createReply } from "../../api/axios";
import { RootState } from "../../store/store";
import { commentError } from "../../util/toastify";

export interface CreateReplyProps {
   onSubmit: (content: string) => void;
   onCancel: () => void;
   boardId: number;
   parentId: number;
   refreshPost: () => void;
}

function CreateReply({
   onSubmit,
   onCancel,
   boardId,
   parentId,
   refreshPost,
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
         onSubmit(value);
         clearValue();
         onCancel();
         refreshPost();
      } else {
         commentError();
      }
      clearValue();
   };

   return (
      <CreateReplyContainer>
         <ReplyInputBox>
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
         </ReplyInputBox>
         <DefaultButton onClick={handleReplySubmit}>등록</DefaultButton>
      </CreateReplyContainer>
   );
}

export default CreateReply;

export const CreateReplyContainer = styled.div`
   background-color: var(--first-color2);
   border-bottom: 1px solid var(--light-gray);
   padding: 15px;
   display: flex;
   align-items: center;
   justify-content: space-between;
`;

export const ReplyInputBox = styled.div`
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
