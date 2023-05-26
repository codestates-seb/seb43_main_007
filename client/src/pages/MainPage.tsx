// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SectionsContainer, Section } from "react-fullpage";
import styled from "styled-components";
import HomeTree from "./HomeTree";
import Home from "./Home";

function MainPage() {
   const options = {
      activeClass: "active",
      anchors: ["One", "Two"],
      arrowNavigation: true,
      delay: 1500,
      navigation: true,
      scrollBar: false,
   };

   // SectionsContainer 태그로 전체를 감싸고 개별 페이지는 Section 태그 사용
   return (
      <MainContainer>
         <SectionsContainer {...options}>
            <Section>
               <HomeTree />
            </Section>
            <Section>
               <Home />
            </Section>
         </SectionsContainer>
      </MainContainer>
   );
}
export default MainPage;

const MainContainer = styled.section``;
