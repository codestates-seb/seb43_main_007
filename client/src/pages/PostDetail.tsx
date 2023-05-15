import styled from "styled-components";
import PostTitle from "../components/postdetail/PostTitle";
import PostContent from "../components/postdetail/PostContent";
import PostButtons from "../components/postdetail/PostButtons";
import CreateComment from "../components/postdetail/CreateComment";
import CommentList from "../components/postdetail/CommentList";

function PostDetail() {
   return (
      <PostDetailContainer>
         <PostTitle />
         <PostContent />
         <PostButtons />
         <CreateComment />
         <CommentList />
      </PostDetailContainer>
   );
}

export default PostDetail;

export const PostDetailContainer = styled.div`
   width: 1080px;
   padding-top: 16px;
`;
