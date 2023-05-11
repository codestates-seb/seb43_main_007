import styled from "styled-components";
import { useState } from "react";
import PostDeleteModal from "./PostDeleteModal";

function PostButtons() {
   const [modalOpen, setModalOpen] = useState(false);

   const openModal = () => {
      setModalOpen(true);
   };
   const closeModal = () => {
      setModalOpen(false);
   };

   return (
      <PostButtonContainer>
         <EditDeleteContainer>
            <button type="button">수정</button>
            <span className="separator">|</span>
            <button type="submit" onClick={openModal}>
               삭제
            </button>
            <PostDeleteModal open={modalOpen} close={closeModal} />
         </EditDeleteContainer>
         <button type="button">목록으로</button>
      </PostButtonContainer>
   );
}

export default PostButtons;

export const PostButtonContainer = styled.div`
   margin-left: 15px;
   margin-bottom: 15px;
   display: flex;
   justify-content: space-between;
   font-size: 13px;

   button {
      color: #787878;
      border: none;
      background-color: transparent;
      font-size: 13px;
      cursor: pointer;
   }
`;

export const EditDeleteContainer = styled.div`
   .separator {
      color: #787878;
   }
`;
