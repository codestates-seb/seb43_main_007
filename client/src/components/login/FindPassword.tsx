import styled from "styled-components";

function FindPassword() {
   return <FindPasswordContainer>비밀번호 찾기</FindPasswordContainer>;
}

export default FindPassword;

const FindPasswordContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 90%;
`;
