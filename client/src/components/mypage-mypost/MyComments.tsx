import styled from "styled-components";

function MyComments() {
   return (
      <DivContainer>
         <div>내가 쓴 댓글</div>
      </DivContainer>
   );
}

export default MyComments;

const DivContainer = styled.div`
   border: 1px solid red;
   width: 350px;
   height: 500px;
`;
