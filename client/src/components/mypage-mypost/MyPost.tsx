import styled from "styled-components";

type MypostProps = {
   title: string;
   data: (string | number)[][];
};

function MyPost({ title, data }: MypostProps) {
   return (
      <DivContainer>
         <div className="title-div">{title}</div>
         <ul>
            {data.map((el) => (
               <li key={el[1]}>{el[0]}</li>
            ))}
         </ul>
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
