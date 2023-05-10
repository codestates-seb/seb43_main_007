import styled from "styled-components";
import teamicon from "../../assets/img/teamicon.png";

function TeamInfo() {
   return (
      <TeamInfoContainer>
         <img className="icon" src={teamicon} alt="team-icon" />
         <span>Team. 메인플스토리</span>
      </TeamInfoContainer>
   );
}

export default TeamInfo;

const TeamInfoContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 200px;
   .icon {
      width: 130px;
      height: 150px;
      margin-bottom: 5px;
   }
`;
