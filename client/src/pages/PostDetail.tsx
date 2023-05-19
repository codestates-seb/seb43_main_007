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
   const { boardId: boardIdString } = useParams<{ [key: string]: string }>();
   const { post, handleDeletePost } = usePost(boardIdString || "");

   if (!post) {
      return <div>Loading...</div>;
   }

   const baordIdNumber = Number(boardIdString) || 0;

   return (
      <PostDetailContainer>
         <PostTitle
            boardId={baordIdNumber}
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
         <PostButtons
            handleDeletePost={handleDeletePost}
            boardId={baordIdNumber}
         />
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
