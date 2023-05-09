import styled from "styled-components";
import LeftPhrases from "./LeftPhrases";
import RightPhrases from "./RightPhrases";
import Weather from "./Weather";

function HomeHeader() {
   return (
      <HomeHeaderContainer>
         <LeftPhrases />
         <RightPhrases />
         <Weather />
      </HomeHeaderContainer>
   );
}

export default HomeHeader;

const HomeHeaderContainer = styled.div`
   display: flex;
   position: relative;
   margin-top: 80px;
   width: 100%;
   height: 100px;
`;
