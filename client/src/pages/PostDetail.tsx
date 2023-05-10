import styled from "styled-components";
import PostTitle from "../components/postdetail/PostTitle";

function PostDetail() {
   return (
      <PostDetailContainer>
         <PostTitle />
      </PostDetailContainer>
   );
}

export default PostDetail;

export const PostDetailContainer = styled.div`
   width: 1080px;
   padding-top: 16px;
`;
