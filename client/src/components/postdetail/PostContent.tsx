import styled from "styled-components";
import { Content } from "./postDetailTypes";

function PostContent({ content }: Content) {
   return <PostContentContainer>{content}</PostContentContainer>;
}

export default PostContent;

export const PostContentContainer = styled.div`
   margin: 30px 0 30px 15px;
   /* 아래 폰트 사이즈는 나중에 지울 것 */
   p {
      font-size: 13px;
   }
`;
