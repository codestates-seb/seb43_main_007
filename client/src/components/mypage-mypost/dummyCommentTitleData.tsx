export interface CommentType {
   memberId: number;
   nickname: string;
   imageUrl: any;
   boards: [
      {
         boardId: number;
         title: string;
         content: string;
         address: string;
         now: string;
         photo: string;
         like: number;
         bookmark: number;
         nickName: string;
         userPhoto: string;
         tags: [
            {
               tagId: number;
               tagName: string;
            }
         ];
      }
   ];
   comments: [
      {
         content: string;
         memberId: number;
      }
   ];
}

const dummyCommentTitleData: CommentType[] = [
   {
      memberId: 1,
      nickname: "시1작해볼까요?",
      imageUrl: null,
      boards: [
         {
            boardId: 1,
            title: "매핑을 너무 많이하는데.",
            content:
               "<p>보틀라운지라는 친환경 카페 공유합니다!</p><p><br></p><p>제가 가봤는데 괜찮은거같아요</p><p><br></p><p>진짜루요</p><p><br></p><p><br></p>",
            address: "서울시 서대문구 홍연길 26",
            now: "2023-05-18T04:22:57.16858",
            photo: "http://www.planet-times.com/Files/320/Images/202206/2022060332507773.jpg",
            like: 0,
            bookmark: 0,
            nickName: "InGeon",
            userPhoto:
               "https://upload.wikimedia.org/wikipedia/ko/thumb/8/81/Spongebob_4795.jpg/345px-Spongebob_4795.jpg",
            tags: [
               {
                  tagId: 1,
                  tagName: "카페",
               },
            ],
         },
      ],
      comments: [
         {
            content: "댓글이나.",
            memberId: 1,
         },
      ],
   },
   {
      memberId: 1,
      nickname: "시1작해볼까요?",
      imageUrl: null,
      boards: [
         {
            boardId: 1,
            title: "2번째 제목.",
            content:
               "<p>보틀라운지라는 친환경 카페 공유합니다!</p><p><br></p><p>제가 가봤는데 괜찮은거같아요</p><p><br></p><p>진짜루요</p><p><br></p><p><br></p>",
            address: "서울시 서대문구 홍연길 26",
            now: "2023-05-18T04:22:57.16858",
            photo: "http://www.planet-times.com/Files/320/Images/202206/2022060332507773.jpg",
            like: 0,
            bookmark: 0,
            nickName: "InGeon",
            userPhoto:
               "https://upload.wikimedia.org/wikipedia/ko/thumb/8/81/Spongebob_4795.jpg/345px-Spongebob_4795.jpg",
            tags: [
               {
                  tagId: 1,
                  tagName: "카페",
               },
            ],
         },
      ],
      comments: [
         {
            content:
               "20자를 한번 넘겨서 댓글을 적었다고 생각을 하고 한번 한번두번 세번 네번 길게 써볼게요!! 댓을이 전체가 다 나오지는 않아야해ㅐ요 왜냐하믄! css가 망가져요",
            memberId: 1,
         },
      ],
   },
   {
      memberId: 1,
      nickname: "시1작해볼까요?",
      imageUrl: null,
      boards: [
         {
            boardId: 1,
            title: "이게 되네.",
            content:
               "<p>보틀라운지라는 친환경 카페 공유합니다!</p><p><br></p><p>제가 가봤는데 괜찮은거같아요</p><p><br></p><p>진짜루요</p><p><br></p><p><br></p>",
            address: "서울시 서대문구 홍연길 26",
            now: "2023-05-18T04:22:57.16858",
            photo: "http://www.planet-times.com/Files/320/Images/202206/2022060332507773.jpg",
            like: 0,
            bookmark: 0,
            nickName: "InGeon",
            userPhoto:
               "https://upload.wikimedia.org/wikipedia/ko/thumb/8/81/Spongebob_4795.jpg/345px-Spongebob_4795.jpg",
            tags: [
               {
                  tagId: 1,
                  tagName: "카페",
               },
            ],
         },
      ],
      comments: [
         {
            content: "댓글입니다.",
            memberId: 1,
         },
      ],
   },
   {
      memberId: 1,
      nickname: "시1작해볼까요?",
      imageUrl: null,
      boards: [
         {
            boardId: 1,
            title: "한 컴포넌트에.",
            content:
               "<p>보틀라운지라는 친환경 카페 공유합니다!</p><p><br></p><p>제가 가봤는데 괜찮은거같아요</p><p><br></p><p>진짜루요</p><p><br></p><p><br></p>",
            address: "서울시 서대문구 홍연길 26",
            now: "2023-05-18T04:22:57.16858",
            photo: "http://www.planet-times.com/Files/320/Images/202206/2022060332507773.jpg",
            like: 0,
            bookmark: 0,
            nickName: "InGeon",
            userPhoto:
               "https://upload.wikimedia.org/wikipedia/ko/thumb/8/81/Spongebob_4795.jpg/345px-Spongebob_4795.jpg",
            tags: [
               {
                  tagId: 1,
                  tagName: "카페",
               },
            ],
         },
      ],
      comments: [
         {
            content: "댓글아입니더.",
            memberId: 1,
         },
      ],
   },
   {
      memberId: 1,
      nickname: "시1작해볼까요?",
      imageUrl: null,
      boards: [
         {
            boardId: 1,
            title: "두개데이터를!?.",
            content:
               "<p>보틀라운지라는 친환경 카페 공유합니다!</p><p><br></p><p>제가 가봤는데 괜찮은거같아요</p><p><br></p><p>진짜루요</p><p><br></p><p><br></p>",
            address: "서울시 서대문구 홍연길 26",
            now: "2023-05-18T04:22:57.16858",
            photo: "http://www.planet-times.com/Files/320/Images/202206/2022060332507773.jpg",
            like: 0,
            bookmark: 0,
            nickName: "InGeon",
            userPhoto:
               "https://upload.wikimedia.org/wikipedia/ko/thumb/8/81/Spongebob_4795.jpg/345px-Spongebob_4795.jpg",
            tags: [
               {
                  tagId: 1,
                  tagName: "카페",
               },
            ],
         },
      ],
      comments: [
         {
            content: "댓글아인교~.",
            memberId: 1,
         },
      ],
   },
];

export default dummyCommentTitleData;
