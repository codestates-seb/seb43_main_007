import styled from "styled-components";

function EditProfile() {
   return (
      <ProfileEditContainer>
         <TitleBox>프로필 관리</TitleBox>
         <MypageBox>
            <label htmlFor="nickname">닉네임</label>
            <InputContainer>
               <input
                  id="nickname"
                  type="text"
                  placeholder="한/영/숫자 10자 이내"
               />
               <DefaultButton>저장</DefaultButton>
            </InputContainer>
            <label htmlFor="profile-pic">프로필 사진</label>
         </MypageBox>
      </ProfileEditContainer>
   );
}

export default EditProfile;

export const ProfileEditContainer = styled.div``;

export const TitleBox = styled.div`
   font-size: 22px;
   color: var(--first-color4);
   font-weight: 700;
   margin: 10px 0;
`;

export const MypageBox = styled.div`
   padding: 20px;
   background-color: var(--first-color2);
   border-radius: 3px;
   display: flex;
   flex-direction: column;

   label {
      font-weight: 600;
      font-size: 13px;
      margin-bottom: 5px;
   }

   .filebox input[type="file"] {
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
      border: 0;
   }
`;

export const InputContainer = styled.div`
   display: flex;
   margin-bottom: 15px;
   input {
      width: 500px;
      height: 32px;
      margin-right: 15px;
      border: 1px solid #dfdfdf;
   }
`;

export const DefaultButton = styled.button`
   height: 32px;
   width: 74px;
   background-color: var(--first-color3);
   border-radius: 3px;
   border: 1px solid #c4dccb;
   color: var(--first-color4);
   cursor: pointer;
   font-size: 13px;
   font-weight: 400;
   outline: none;
   text-align: center;
   transition-duration: 3ms;

   &:hover {
      background-color: #d4e6d9;
   }

   &:active {
      background-color: #c4dccb;
   }
`;
