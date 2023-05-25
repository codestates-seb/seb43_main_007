import {
   ModalContainer,
   ModalContentBox,
   DeleteButton,
   CancelButton,
} from "../mypage-profile/AccountDeleteModal";

export interface PostDeleteModalProps {
   open: boolean;
   close: () => void;
   handleDeletePost: () => void;
}

function PostDeleteModal({
   open,
   close,
   handleDeletePost,
}: PostDeleteModalProps) {
   return (
      <ModalContainer className={open ? "openModal" : "closeModal"}>
         <ModalContentBox>
            <h1>게시글 삭제</h1>
            <p>정말로 게시글을 삭제하시겠습니까?</p>
            <div className="button-container">
               <DeleteButton onClick={handleDeletePost}>
                  게시글 삭제
               </DeleteButton>
               <CancelButton onClick={close}>취소</CancelButton>
            </div>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <span className="material-symbols-outlined" onClick={close}>
               close
            </span>
         </ModalContentBox>
      </ModalContainer>
   );
}

export default PostDeleteModal;
