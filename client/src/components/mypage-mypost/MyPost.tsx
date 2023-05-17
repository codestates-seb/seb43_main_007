import styled from "styled-components";

function MyPost() {
   return (
      <DivContainer>
         <div>내가 쓴 글</div>
      </DivContainer>
   );
}

export default MyPost;

const DivContainer = styled.div`
   border: 1px solid red;
   width: 350px;
   height: 500px;
`;
