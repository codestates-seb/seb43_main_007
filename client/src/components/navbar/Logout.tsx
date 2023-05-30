import styled from "styled-components";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { BiLogOut } from "react-icons/bi";

function Logout() {
   const [, , removeCookie] = useCookies(["accessToken", "isAdmin"]);

   const navigate = useNavigate();
   const handleLogout = () => {
      removeCookie("accessToken");
      removeCookie("isAdmin");
      sessionStorage.removeItem("memberId");
      navigate(`/`);
      window.location.reload();
   };

   return (
      <LogoutContainer>
         <BiLogOut className="logout-icon" />
         <button type="submit" className="logout-btn" onClick={handleLogout}>
            로그아웃
         </button>
      </LogoutContainer>
   );
}

export default Logout;

export const LogoutContainer = styled.div`
   display: flex;
   align-items: center;

   .logout-icon {
      margin-right: 5px;
      color: var(--dark-gray);
   }

   .logout-btn {
      padding: 0;
      border: none;
      background-color: transparent;
      font-size: 13px;
      color: var(--dark-gray);
      cursor: pointer;

      &:hover {
         color: black;
      }
   }
`;
