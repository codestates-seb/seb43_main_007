import styled from "styled-components";

function LeftPhrases() {
   return (
      <LeftPhrasesContainer>
         <span className="text">We Gather Together,</span>
      </LeftPhrasesContainer>
   );
}

export default LeftPhrases;

const LeftPhrasesContainer = styled.div`
   display: flex;
   width: 580px;
   height: 70px;
   display: flex;
   align-items: center;
   background-color: var(--third-color3);
   position: absolute;
   left: 5px;
   box-shadow: 2px 3px 2px 0;
   border-radius: 1000px;
   .text {
      color: white;
      font-weight: 900;
      margin-left: 70px;
      font-size: 24px;
   }
`;
