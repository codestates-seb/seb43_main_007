import styled from "styled-components";
import ListContents from "../components/communityList/ListContents";

function CommunityList() {
   return (
      <DivContainer>
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
   margin-left: 300px;
   /* justify-content: center; */

   width: 100%;
   height: 100%;
`;
