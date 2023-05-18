import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PostTitle from "../components/postdetail/PostTitle";
import PostContent from "../components/postdetail/PostContent";
import PostTags from "../components/postdetail/PostTags";
import PostButtons from "../components/postdetail/PostButtons";
import CreateComment from "../components/postdetail/CreateComment";
import CommentList from "../components/postdetail/CommentList";
import { getPostData } from "../api/axios";
import { Post } from "../components/postdetail/postDetailTypes";
import PostAddress from "../components/postdetail/PostAddress";

function PostDetail() {
   const params = useParams();
   const { boardId } = params as { boardId: string };
   const [post, setPost] = useState<Post | null>(null);

   useEffect(() => {
      const fetchPost = async () => {
         const data = await getPostData(parseInt(boardId, 10));
         setPost(data);
      };

      fetchPost();
   }, [boardId]);

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
