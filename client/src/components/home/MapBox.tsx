import styled from "styled-components";
import { useEffect } from "react";

declare global {
   interface Window {
      kakao: any;
   }
}

function MapBox({ data, id }: { data: string; id: number }) {
   useEffect(() => {
      if (data.length > 0) {
         const { kakao } = window;
         const mapContainer = document.getElementById(`map${id}`); // 지도를 표시할 div
         const mapOption = {
            center: new kakao.maps.LatLng(37.5, 127.0), // 지도의 중심좌표
            level: 4, // 지도의 확대 레벨
         };

         // 지도를 생성합니다
         const map = new kakao.maps.Map(mapContainer, mapOption);

         // 주소-좌표 변환 객체를 생성합니다
         const geocoder = new kakao.maps.services.Geocoder();

         // 주소로 좌표를 검색합니다
         geocoder.addressSearch(
            data,
            function search(result: any, status: any) {
               // 정상적으로 검색이 완료됐으면
               if (status === kakao.maps.services.Status.OK) {
                  const coords = new kakao.maps.LatLng(
                     result[0].y,
                     result[0].x
                  );

                  // 결과값으로 받은 위치를 마커로 표시합니다
                  const marker = new kakao.maps.Marker({
                     map,
                     position: coords,
                  });
                  marker.setMap(map);

                  map.setCenter(coords);
               }
            }
         );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <MapBoxContainer>
         <div className="map" id={`map${id}`} />
      </MapBoxContainer>
   );
}

export default MapBox;

const MapBoxContainer = styled.div`
   display: flex;
   justify-content: center;
   margin-bottom: 20px;
   .map {
      width: 300px;
      height: 300px;
   }
`;
