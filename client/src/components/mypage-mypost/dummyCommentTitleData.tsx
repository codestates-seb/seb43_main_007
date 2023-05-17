export interface CommentType {
   boardId: number;
   title: string;
   commentId: number;
   nickname: string;
   picture: string;
   content: string;
   createdAt: string;
   parent?: {
      commentId: number;
   };
   replies?: CommentType[];
}

const dummyCommentTitleData: CommentType[] = [
   {
      boardId: 1,
      title: "이건 제목이야",
      commentId: 1,
      nickname: "catsthebest",
      picture:
         "https://i.pinimg.com/564x/ee/c7/c7/eec7c7efad638efbbf2711c5f4f0d783.jpg",
      content:
         "정보 감사합니다. 내일 경북대 근처에 가는데 친구 저기서 만나야겠네요ㅋㅋ",
      createdAt: "2023.05.03 31:02:15",
   },
   {
      boardId: 1,
      title: "이건 제목이야",
      commentId: 2,
      nickname: "고양사는고양",
      picture:
         "https://www.warrenphotographic.co.uk/photography/bigs/16576-Ginger-father-cat-and-tabby-kitten-white-background.jpg",
      content: "여자친구랑 대구 여행 가기로 했는데 물어봐야지~!",
      createdAt: "2023.05.03 21:08:45",
   },
   {
      boardId: 1,
      title: "이건 제목이야",
      commentId: 3,
      nickname: "입벌려츄르들어간다",
      picture:
         "https://media.istockphoto.com/id/950393460/photo/closeup-portrait-of-funny-ginger-cat-wearing-sunglasses.jpg?s=612x612&w=0&k=20&c=y9SZRC2Oi4841furhPIaxR6J-15671qwt3_e_SkhwLs=",
      content: "츄르도 판매하나요?",
      createdAt: "2023.05.03 21:10:10",
   },
   {
      boardId: 1,
      title: "이건 제목이야",
      commentId: 4,
      nickname: "냥아치",
      picture:
         "https://cdn.pixabay.com/photo/2022/10/10/12/26/cat-7511712_960_720.jpg",
      content: "형이 이렇게까지 행복하길 바란 건 아니었어",
      createdAt: "2023.05.03 21:16:22",
      parent: {
         commentId: 2,
      },
   },
   {
      boardId: 1,
      title: "이건 제목이야",
      commentId: 5,
      nickname: "냥이",
      picture:
         "https://cdn.pixabay.com/photo/2023/04/27/10/22/cat-7954262_640.jpg",
      content: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
      createdAt: "2023.05.03 21:35:04",
      parent: {
         commentId: 2,
      },
   },
];

export default dummyCommentTitleData;
