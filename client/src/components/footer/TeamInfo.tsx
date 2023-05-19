import styled from "styled-components";
import githubIcon from "../../assets/img/github-icon.png";

function TeamInfo() {
   return (
      <TeamInfoContainer>
         <a
            className="icon-box"
            href="https://github.com/codestates-seb/seb43_main_007"
            target="_blank"
            rel="noreferrer"
         >
            <img className="icon" src={githubIcon} alt="team-icon" />
         </a>
         <span className="text project-name">나만의 친환경</span>
         <span className="text team-name">Team. 메인플스토리</span>
      </TeamInfoContainer>
   );
}

export default TeamInfo;

const TeamInfoContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   width: auto;
   .icon-box {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 5px;
      .icon {
         width: 30px;
         height: 30px;
         margin: 5px;
      }
   }

   .text {
      margin-bottom: 10px;
   }
   .project-name {
      font-size: 25px;
   }
`;
