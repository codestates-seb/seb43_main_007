import styled from "styled-components";

function FindId() {
   return <FindIdContainer>아이디찾기</FindIdContainer>;
}

export default FindId;

const FindIdContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 90%;
`;
