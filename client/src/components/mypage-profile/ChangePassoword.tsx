import { useForm, SubmitHandler } from "react-hook-form";
import validFunc from "../../util/signinValidFunc";
import { PasswordChangeForm } from "./ProfileTypes";
import {
   ProfileEditContainer,
   TitleBox,
   SectionBox,
   SubsectionBox,
   InputButtonContainer,
   DefaultButton,
} from "./EditProfile";

function ChangePassoword() {
   const {
      register,
      handleSubmit,
      getValues,
      formState: { errors, isValid },
   } = useForm<PasswordChangeForm>({
      mode: "onChange",
      criteriaMode: "all",
      defaultValues: {
         currentPassword: "",
         newPassword: "",
         confirmPassword: "",
      },
   });
   const onSubmit: SubmitHandler<PasswordChangeForm> = (data) =>
      console.log(data);

   return (
      <ProfileEditContainer onSubmit={handleSubmit(onSubmit)}>
         <TitleBox>비밀번호 변경</TitleBox>
         <SectionBox>
            <SubsectionBox>
               <label htmlFor="current-password">현재 비밀번호</label>
               <InputButtonContainer>
                  <input
                     id="current-password"
                     type="password"
                     placeholder="현재 비밀번호"
                     {...register("currentPassword", {
                        required: "현재 비밀번호를 입력해주세요.",
                     })}
                  />
               </InputButtonContainer>
               {errors.currentPassword && (
                  <p className="error-msg">{errors.currentPassword.message}</p>
               )}
            </SubsectionBox>
            <SubsectionBox>
               <label htmlFor="new-password">새로운 비밀번호</label>
               <InputButtonContainer>
                  <input
                     id="new-password"
                     type="password"
                     placeholder="영문, 숫자 포함 8자 이상 20자 이하"
                     {...register("newPassword", {
                        required: true,
                        validate: (value) =>
                           validFunc.validPassword(value) ||
                           "영문, 숫자 포함 8자 이상 20자 이하여야 합니다",
                     })}
                  />
               </InputButtonContainer>
               {errors.newPassword && (
                  <p className="error-msg">{errors.newPassword.message}</p>
               )}
            </SubsectionBox>
            <SubsectionBox>
               <label htmlFor="confirm-password">비밀번호 재확인</label>
               <InputButtonContainer>
                  <input
                     id="confirm-password"
                     type="password"
                     placeholder="새로운 비밀번호 재입력"
                     {...register("confirmPassword", {
                        required: true,
                        validate: (value) =>
                           value === getValues().newPassword ||
                           "비밀번호가 일치하지 않습니다.",
                     })}
                  />
                  <DefaultButton type="submit" disabled={!isValid}>
                     변경
                  </DefaultButton>
               </InputButtonContainer>
               {errors.confirmPassword && (
                  <p className="error-msg">{errors.confirmPassword.message}</p>
               )}
            </SubsectionBox>
         </SectionBox>
      </ProfileEditContainer>
   );
}

export default ChangePassoword;