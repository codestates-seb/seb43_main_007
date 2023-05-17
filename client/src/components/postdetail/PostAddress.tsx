import styled from "styled-components";
import { HiLocationMarker } from "react-icons/hi";
import { Address } from "./postDetailTypes";

function PostAddress({ address }: Address) {
   return (
      <PostAddressContainer>
         <HiLocationMarker className="address-icon" />
         {address}
      </PostAddressContainer>
   );
}

export default PostAddress;

export const PostAddressContainer = styled.div`
   margin: 10px 0 20px 15px;
   font-size: 12px;
   display: flex;
   align-items: center;

   .address-icon {
      color: var(--first-color4);
      width: 15px;
      height: 15px;
      margin-right: 5px;
   }
`;
