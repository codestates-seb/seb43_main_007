import styled from "styled-components";
import { motion } from "framer-motion";
import ListContents from "../components/communityList/ListContents";

function CommunityList() {
   return (
      <DivContainer
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1.5 }}
      >
         <ListContents />
      </DivContainer>
   );
}
export default CommunityList;

const DivContainer = styled(motion.div)`
   /* border: 1px solid black; */
   display: flex;
   flex-direction: column;
   align-items: center;
   margin-left: 300px;
   /* justify-content: center; */

   width: 100%;
   height: 100%;
`;
