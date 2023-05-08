import {
   ProfileEditContainer,
   TitleBox,
   MypageBox,
   InputContainer,
   DefaultButton,
} from "./EditProfile";

function ChangePassoword() {
   return (
      <ProfileEditContainer>
         <TitleBox>비밀번호 변경</TitleBox>
         <MypageBox>
            <label htmlFor="current-password">현재 비밀번호</label>
            <InputContainer>
               <input
                  id="current-password"
                  type="text"
                  placeholder="현재 비밀번호를 입력해주세요."
               />
            </InputContainer>
            <label htmlFor="new-password">새로운 비밀번호</label>
            <InputContainer>
               <input
                  id="new-password"
                  type="text"
                  placeholder="한/영/숫자 10자 이내"
               />
            </InputContainer>
            <label htmlFor="confirm-password">비밀번호 재확인</label>
            <InputContainer>
               <input
                  id="confirm-password"
                  type="text"
                  placeholder="새로운 비밀번호를 다시 입력해주세요"
               />
               <DefaultButton>변경</DefaultButton>
            </InputContainer>
         </MypageBox>
      </ProfileEditContainer>
   );
}

export default ChangePassoword;
