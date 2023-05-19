import styled from "styled-components";
import { useParams } from "react-router";
import PostTitle from "../components/postdetail/PostTitle";
import PostContent from "../components/postdetail/PostContent";
import PostTags from "../components/postdetail/PostTags";
import PostButtons from "../components/postdetail/PostButtons";
import CreateComment from "../components/postdetail/CreateComment";
import CommentList from "../components/postdetail/CommentList";
import PostAddress from "../components/postdetail/PostAddress";
import usePost from "../hooks/usePost";

function PostDetail() {
   const { boardId } = useParams<{ [key: string]: string }>();
   const { post, handleDeletePost } = usePost(boardId || "");

   if (!post) {
      return <div>Loading...</div>;
   }

   return (
      <PostDetailContainer>
         <PostTitle
            title={post.title}
            now={post.now}
            like={post.like}
            bookmark={post.bookmark}
            nickName={post.nickName}
            userPhoto={post.userPhoto}
         />
         <PostAddress address={post.address} />
         <PostContent content={post.content} />
         <PostTags tags={post.tags} />
         <PostButtons handleDeletePost={handleDeletePost} />
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
