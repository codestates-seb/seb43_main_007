import styled from "styled-components";
import ListSearch from "../components/CommunityList/ListSearch";
import ListContents from "../components/CommunityList/ListContents";

function CommunityList() {
   return (
      <DivContainer>
         <ListSearch />
         <ListContents />
      </DivContainer>
   );
}
export default CommunityList;

const DivContainer = styled.div`
   /* border: 1px solid black; */
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;

   width: 100%;
   height: 100vh;
`;
