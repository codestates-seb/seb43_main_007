import styled from "styled-components";

interface Props {
   content: number;
}

function ContentsBox({ content }: Props) {
   return <ContentsBoxContainer>여기에 글 넣기{content}</ContentsBoxContainer>;
}

export default ContentsBox;

const ContentsBoxContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 50px;
   min-width: 700px;
   height: 95%;
   background-color: var(--first-color3);
   margin: 0 10px;
   box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
      rgba(0, 0, 0, 0.22) 0px 15px 12px;
`;
