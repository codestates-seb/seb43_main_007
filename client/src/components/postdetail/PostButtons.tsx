import styled from "styled-components";
import { useState } from "react";
import PostDeleteModal from "./PostDeleteModal";

function PostButtons({ handleDeletePost }: { handleDeletePost: () => void }) {
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
            <button className="postdetail-btn edit-btn" type="button">
               수정
            </button>
            <span className="separator">|</span>
            <button
               className="postdetail-btn"
               type="submit"
               onClick={openModal}
            >
               삭제
            </button>
            <PostDeleteModal
               open={modalOpen}
               close={closeModal}
               handleDeletePost={handleDeletePost}
            />
         </EditDeleteContainer>
         <button className="postdetail-btn" type="button">
            목록으로
         </button>
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

   .postdetail-btn {
      color: #787878;
      border: none;
      background-color: transparent;
      font-size: 13px;
      cursor: pointer;
   }

   .edit-btn {
      padding-left: 0;
   }
`;

export const EditDeleteContainer = styled.div`
   .separator {
      color: #787878;
   }
`;
