export interface EditerPickType {
   boardId: number;
   title: string;
   content: string;
   address: string;
   now: string;
   photo: string;
   pin: number;
   pick: number;
   likeCheck: number;
   bookmark: number;
   nickName: string;
   userPhoto: string;
   category: string;
   comments: [];
   likeCount: number;
   memberId: number;
   tags: { tagId: number; tagName: string }[];
}

const editorPickDummyContents: EditerPickType[] = [
   {
      boardId: 0,
      title: "",
      content: "",
      address: "",
      now: "",
      photo: "",
      pin: 0,
      pick: 0,
      likeCheck: 0,
      bookmark: 0,
      nickName: "",
      userPhoto: "",
      category: "",
      comments: [],
      likeCount: 0,
      memberId: 0,
      tags: [],
   },
   {
      boardId: 0,
      title: "관리자 채택글이 존재하지 않습니다.",
      content: "",
      address: "",
      now: "",
      photo: "",
      pin: 0,
      pick: 0,
      likeCheck: 0,
      bookmark: 0,
      nickName: "",
      userPhoto: "",
      category: "",
      comments: [],
      likeCount: 0,
      memberId: 0,
      tags: [],
   },
];

export default editorPickDummyContents;
