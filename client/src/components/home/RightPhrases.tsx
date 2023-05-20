import styled from "styled-components";

function RightPhrases() {
   return (
      <RightPhrasesContainer>
         <span className="text">We Save The Earth Together</span>
      </RightPhrasesContainer>
   );
}

export default RightPhrases;

const RightPhrasesContainer = styled.div`
   display: flex;
   width: 450px;
   height: 70px;
   display: flex;
   align-items: center;
   background-color: var(--second-color3);
   position: absolute;
   left: 350px;
   top: 15px;
   box-shadow: 2px 3px 2px 0 rgba(0, 0, 0);
   border-radius: 1000px;
   z-index: 2;
   .text {
      font-weight: 900;
      margin-left: 70px;
      font-size: 24px;
   }
`;
