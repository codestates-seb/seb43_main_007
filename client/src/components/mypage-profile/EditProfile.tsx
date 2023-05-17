import styled from "styled-components";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { RootState } from "../../store/store";
import validFunc from "../../util/signinValidFunc";
import { setPhoto, resetPhoto } from "../../reducers/profilePhotoSlice";
import { SignupTypes } from "../signup/SignupTypes";
import { setNickname } from "../../reducers/profileNicknameSlice";
import {
   resetUserProfilePhoto,
   updateNickname,
   updateUserProfilePhoto,
} from "../../api/axios";
import {
   nicknameChangeRetry,
   nicknameChangeSuccess,
   photoChangeError,
   photoChangeSuccess,
   serverError,
} from "../../util/toastify";

function EditProfile() {
   // useForm setup
   const {
      register,
      handleSubmit,
      formState: { errors, isValid },
      watch,
   } = useForm<SignupTypes>({
      mode: "onChange",
      criteriaMode: "all",
      defaultValues: {
         nickname: "",
      },
   });

   // Redux dispatch
   const dispatch = useDispatch();

   // State variables
   const [fileName, setFileName] = useState("");
   const [prevPhoto, setPrevPhoto] = useState("");

   // Redux selector
   const memberId = useSelector((state: RootState) => state.memberId);
   const currentPhoto = useSelector(
      (state: RootState) => state.profilePhoto.photo
   );

   // Handlers
   const onSubmit: SubmitHandler<SignupTypes> = (data) => console.log(data);
   const currentNickname = watch("nickname");

   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         setFileName(file.name);
         setPrevPhoto(currentPhoto);
         const reader = new FileReader();
         reader.onload = (event) => {
            if (event.target) {
               const fileResult = event.target.result as string;
               setPrevPhoto(fileResult);
            }
         };
         reader.readAsDataURL(file);

         updateUserProfilePhoto(memberId, file)
            .then((data) => {
               photoChangeSuccess(); // 로컬에선 실패해도 뜨는 상태. 서버 연결 후 테스트 해봐야 함
               dispatch(setPhoto(prevPhoto));
            })
            .catch((error) => {
               console.error("프로필 사진 변경에 실패하였습니다.", error);
               photoChangeError();
            });
      }
   };

   const handleSave = () => {
      updateNickname(memberId, currentNickname)
         .then(() => {
            dispatch(setNickname(currentNickname));
            nicknameChangeSuccess();
         })
         .catch((error) => {
            console.error("닉네임 변경에 실패하였습니다.", error);
            if (error.message === "닉네임 중복") {
               nicknameChangeRetry();
            } else if (error.message === "서버 오류") {
               serverError();
            }
         });
   };

   const handleDelete = () => {
      resetUserProfilePhoto(memberId)
         .then(() => {
            dispatch(resetPhoto());
            setFileName("");
         })
         .catch((error) => {
            console.error("프로필 사진 초기화에 실패하였습니다.", error);
            photoChangeError();
         });
   };

   return (
      <ProfileEditContainer onSubmit={handleSubmit(onSubmit)}>
         <TitleBox>프로필 관리</TitleBox>
         <SectionBox>
            <SubsectionBox>
               <label htmlFor="nickname">닉네임</label>
               <InputButtonContainer>
                  <input
                     id="nickname"
                     type="text"
                     placeholder="한글 및 영어, 숫자 10자 이내"
                     {...register("nickname", {
                        required: true,
                        validate: (value) =>
                           validFunc.validNickName(value) ||
                           "닉네임은 10자 이하여야 합니다.",
                     })}
                  />
                  <DefaultButton
                     type="submit"
                     onClick={handleSave}
                     disabled={!isValid}
                  >
                     저장
                  </DefaultButton>
               </InputButtonContainer>
               {errors.nickname && (
                  <p className="error-msg">{errors.nickname.message}</p>
               )}
            </SubsectionBox>
            <SubsectionBox>
               <label htmlFor="profile-pic">프로필 사진</label>
               <InputButtonContainer>
                  <input
                     className="upload-name"
                     value={fileName}
                     placeholder="jpeg, jpg, png 형식"
                     readOnly
                  />
                  <label htmlFor="img-file" className="find-btn">
                     파일 찾기
                  </label>
                  <DefaultButton type="button" onClick={handleDelete}>
                     삭제
                  </DefaultButton>
                  <input
                     id="img-file"
                     type="file"
                     accept="image/jpeg, image/png"
                     onChange={handleFileChange}
                  />
               </InputButtonContainer>
            </SubsectionBox>
         </SectionBox>
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

export const SectionBox = styled.div`
   padding: 20px;
   background-color: var(--first-color2);
   border-radius: 3px;
   display: flex;
   flex-direction: column;
`;

export const SubsectionBox = styled.div`
   margin-bottom: 15px;

   label {
      font-weight: 600;
      font-size: 13px;
   }

   .error-msg {
      font-size: 13px;
      color: red;
      margin-top: 3px;
   }
`;

export const InputButtonContainer = styled.div`
   display: flex;
   margin-top: 3px;
   input {
      width: 500px;
      height: 32px;
      margin-right: 15px;
      font-size: 13px;
      border: 1px solid var(--light-gray);
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

   &:hover:not(:disabled) {
      background-color: #d4e6d9;
   }

   &:active:not(:disabled) {
      background-color: #c4dccb;
   }

   &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
   }
`;
