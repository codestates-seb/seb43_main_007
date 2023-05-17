import styled from "styled-components";
import githubIcon from "../../assets/img/github-icon.png";

interface Props {
   name: string;
   img: string;
}

function IndividualIntro({ name, img }: Props) {
   return (
      <IndividualIntroContainer>
         <span className="member-name">{name}</span>
         <img className="member-icon" src={img} alt="icon" />
         {/* <img className="github-icon" src={githubIcon} alt="github" /> */}
      </IndividualIntroContainer>
   );
}

export default IndividualIntro;

const IndividualIntroContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   width: 120px;
   .member-name {
      font-size: var(--font-large);
   }
   .member-icon {
      border-radius: 50%;
      width: 80px;
      height: 70px;
      margin-top: 5px;
   }
   .github-icon {
      border-radius: 50%;
      width: 80px;
      height: 70px;
      margin-top: 5px;
   }
`;
