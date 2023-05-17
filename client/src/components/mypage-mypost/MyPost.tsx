import styled from "styled-components";

type MypostProps = {
   title: string;
};

function MyPost({ title }: MypostProps) {
   return (
      <DivContainer>
         <div className="title-div">{title}</div>
      </DivContainer>
   );
}

export default MyPost;

const DivContainer = styled.div`
   border: 1px solid red;
   width: 350px;
   height: 500px;
   text-align: center;

   .title-div {
      font-size: 25px;
   }
`;
