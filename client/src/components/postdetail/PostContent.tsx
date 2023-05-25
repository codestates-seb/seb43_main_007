import styled from "styled-components";

export interface Content {
   content: string;
}

function PostContent({ content }: Content) {
   return (
      <PostContentContainer dangerouslySetInnerHTML={{ __html: content }} />
   );
}

export default PostContent;

export const PostContentContainer = styled.div`
   margin: 30px 0 30px 15px;

   img {
      max-width: 100%;
      height: auto;
   }
`;
