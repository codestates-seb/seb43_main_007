import styled from "styled-components";

function PostButtons() {
   return (
      <PostButtonContainer>
         <EditDeleteContainer>
            <button type="button">수정</button>
            <span className="separator">|</span>
            <button type="submit">삭제</button>
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
   }
`;

export const EditDeleteContainer = styled.div`
   .separator {
      color: #787878;
   }
`;
