import styled from "styled-components";

function SigninForm() {
   return (
      <SigninFormContainer>
         <div>닉네임</div>
         <div>이메일</div>
         <div>비밀번호</div>
         <div>비밀번호확인</div>
         <div>본인 인증 주민등록번호</div>
         <div>비밀번호 찾기용 퀴즈</div>
         <div>비밀번호 찾기용 답</div>
      </SigninFormContainer>
   );
}

export default SigninForm;

const SigninFormContainer = styled.form`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 700px;
   height: 80%;
   background-color: skyblue;
`;
