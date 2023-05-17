export interface EditorPickContentType {
   title: string;
   content: string;
   author: string;
   createdAt: string;
   address: string;
   id: number;
}

export const editorPickDummyContents: EditorPickContentType[] = [
   {
      title: "",
      content: "",
      author: "",
      createdAt: "",
      address: "",
      id: 0,
   },
   {
      title: "롯데타워",
      content: "롯데타워에는 친환경 안하나?",
      author: "롯데팬",
      createdAt: "2023-05-16T01:02:17Z",
      address: "서울시 송파구 올림픽로 300",
      id: 1,
   },
   {
      title: "보틀라운지",
      content: "친환경 카페 공유합니다.",
      author: "지나가던사람",
      createdAt: "2023-05-16T01:02:17Z",
      address: "서울시 서대문구 홍연길 26",
      id: 2,
   },
   {
      title: "창원의집",
      content: "창원 놀러오세요~",
      author: "창원토박이",
      createdAt: "2023-05-16T01:02:17Z",
      address: "경상남도 창원시 의창구 사림로16번길 59",
      id: 3,
   },
   {
      title: "사직 야구장",
      content: "가즈아~~~~~~~~~~",
      author: "야구맨",
      createdAt: "2023-05-16T01:02:17Z",
      address: "부산광역시 동래구 사직로 45",
      id: 4,
   },
   {
      title: "경복궁",
      content: "그냥 경복궁",
      author: "경복궁",
      createdAt: "2023-05-16T01:02:17Z",
      address: "서울특별시 종로구 사직로 161",
      id: 5,
   },
];
