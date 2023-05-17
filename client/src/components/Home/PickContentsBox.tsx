import styled from "styled-components";

function PickContentsBox({ contents }: any) {
   return (
      <PickContentsBoxContainer>
         <h2>{contents.title}</h2>
         <div>
            <span>{contents.author}</span>
         </div>
         <p>{contents.content}</p>
      </PickContentsBoxContainer>
   );
}

export default PickContentsBox;

const PickContentsBoxContainer = styled.div`
   display: flex;
`;
