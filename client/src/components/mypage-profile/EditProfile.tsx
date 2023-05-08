import styled from "styled-components";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setPhoto } from "../../reducers/ProfilePhotoSlice";

function EditProfile() {
   const [fileName, setFileName] = useState("");

   const dispatch = useDispatch();

   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         setFileName(file.name);
         const reader = new FileReader();
         reader.onload = (event) => {
            if (event.target) {
               const fileResult = event.target.result as string;
               dispatch(setPhoto(fileResult));
            }
         };
         reader.readAsDataURL(file);
      }
   };

   const handleDelete = () => {
      dispatch(setPhoto(""));
      setFileName("");
   };

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
            <InputContainer>
               <input
                  className="upload-name"
                  value={fileName}
                  placeholder={fileName}
                  readOnly
               />
               <label htmlFor="img-file" className="find-btn">
                  파일 찾기
               </label>
               <DefaultButton onClick={handleDelete}>삭제</DefaultButton>
               <input
                  id="img-file"
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={handleFileChange}
               />
            </InputContainer>
         </MypageBox>
      </ProfileEditContainer>
   );
}

export default EditProfile;

export const ProfileEditContainer = styled.div`
   margin-bottom: 35px;
`;

export const TitleBox = styled.div`
   font-size: 20px;
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
      font-size: 13px;
      border: 1px solid #dfdfdf;
   }

   input:focus {
      box-shadow: 0 0 0 2px rgba(0, 149, 255, 0.15);
      border: 1px solid var(--second-color3);
      outline: none;
   }

   .upload-name {
      cursor: not-allowed;
   }

   input[type="file"] {
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
      border: 0;
   }

   .find-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
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
      transition-duration: 3ms;

      &:hover {
         background-color: #d4e6d9;
      }

      &:active {
         background-color: #c4dccb;
      }
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
