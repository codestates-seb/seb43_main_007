import styled from "styled-components";

interface Props {
   name: string;
   img: string;
}

function IndividualIntro({ name, img }: Props) {
   return (
      <IndividualIntroContainer>
         <span className="member-name">{name}</span>
         <img className="member-icon" src={img} alt="icon" />
      </IndividualIntroContainer>
   );
}

export default IndividualIntro;

const IndividualIntroContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   width: 130px;
   .member-name {
      font-size: 20px;
   }
   .member-icon {
      border-radius: 50%;
      width: 100px;
      height: 90px;
      margin-top: 5px;
   }
`;
