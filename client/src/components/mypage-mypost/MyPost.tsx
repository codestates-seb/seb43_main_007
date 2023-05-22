import styled from "styled-components";
// import { CommentType } from "./dummyCommentTitleData";

type MypostProps = {
   title: string;
   data: string[] | undefined;
};

function MyPost({ title, data }: MypostProps) {
   return (
      <DivContainer>
         <div className="title-div">{title}</div>
         <UlPostsStyle>
            {data?.map((el, idx) => {
               const key = idx;
               return (
                  <LiPostStyle key={key}>
                     <span className="number">{idx + 1}.</span>
                     <span>{el}</span>
                  </LiPostStyle>
               );
            })}
         </UlPostsStyle>
      </DivContainer>
   );
}

export default MyPost;

const DivContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   border-radius: 5px;
   background-color: white;
   width: 350px;
   height: 500px;
   text-align: center;

   .title-div {
      font-size: 25px;
   }
`;

const UlPostsStyle = styled.ul`
   padding: 0px;
   margin-top: 30px;
   width: 100%;
   text-align: left;
`;

const LiPostStyle = styled.li`
   display: flex;
   align-items: center;

   margin: 10px 5px 10px 5px;
   height: 30px;

   cursor: pointer;
   /* background-color: #eef1d8; */
   border-bottom: 2px solid #eef1d8;

   .number {
      width: 25px;
   }
`;
