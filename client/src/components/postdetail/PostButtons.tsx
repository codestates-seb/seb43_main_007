import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import PostDeleteModal from "./PostDeleteModal";
import { RootState } from "../../store/store";

export interface PostButtonsProps {
   memberId: number;
   handleDeletePost: () => Promise<void>;
   boardId: number;
   category: string;
}

function PostButtons({
   memberId,
   handleDeletePost,
   boardId,
   category,
}: PostButtonsProps) {
   const [modalOpen, setModalOpen] = useState(false);

   const myMemberId = useSelector((state: RootState) => state.memberId);
   const isAdmin = useSelector((state: RootState) => state.isAdmin);

   const openModal = () => {
      setModalOpen(true);
   };
   const closeModal = () => {
      setModalOpen(false);
   };

   const navigate = useNavigate();

   const handleEdit = () => {
      navigate(`/editpost/${boardId}`);
   };

   const handleToList = () => {
      navigate(`/communitylist/${category}`);
   };

   return (
      <PostButtonContainer>
         {(isAdmin || memberId === myMemberId) && (
            <EditDeleteContainer>
               <button
                  className="postdetail-btn edit-btn"
                  type="button"
                  onClick={handleEdit}
               >
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
         )}
         <button
            className="postdetail-btn"
            type="button"
            onClick={handleToList}
         >
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
