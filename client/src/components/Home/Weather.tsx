import styled from "styled-components";

function Weather() {
   return (
      <WeatherContainer>
         <div className="icon">아이콘</div>
         <div className="contents">
            <span className="region">서울</span>
            <span className="dust">
               미세먼지 : <span className="dust-condition">보통</span>
            </span>
         </div>
      </WeatherContainer>
   );
}

export default Weather;

const WeatherContainer = styled.div`
   display: flex;
   position: absolute;
   right: 5px;
   width: 200px;
   height: 70px;
   background-color: skyblue;
   .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70px;
      background-color: antiquewhite;
   }
   .contents {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 3px;
      padding-left: 3px;
      span {
         font-weight: 900;
         margin-bottom: 5px;
      }
   }
   .region {
      font-size: 20px;
   }
   .dust {
      color: gray;
   }
   .dust-condition {
      color: green;
   }
`;
