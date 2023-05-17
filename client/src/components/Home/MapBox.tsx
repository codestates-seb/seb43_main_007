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
                  const content = "<span class ='info-title'>요기!</span>";

                  // 커스텀 오버레이가 표시될 위치입니다
                  const position = new kakao.maps.LatLng(
                     result[0].y,
                     result[0].x
                  );

                  // 커스텀 오버레이를 생성합니다
                  const customOverlay = new kakao.maps.CustomOverlay({
                     position,
                     content,
                  });

                  // 커스텀 오버레이를 지도에 표시합니다
                  customOverlay.setMap(map, marker);

                  // 인포윈도우로 장소에 대한 설명을 표시합니다
                  // const infowindow = new kakao.maps.InfoWindow({
                  //    content:
                  //       '<div style="width:150px;text-align:center;padding:5px 0;">요기!</div>',
                  // });
                  // infowindow.open(map, marker);

                  // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
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
      .info-title {
         display: block;
         background: #50627f;
         color: #fff;
         text-align: center;
         height: 24px;
         line-height: 22px;
         border-radius: 4px;
         padding: 0px 10px;
      }
   }
`;
