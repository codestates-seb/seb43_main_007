// export type ListDataProps = {
//    id: string;
//    createdAt: string;
//    title: string;
//    url: string;
//    author: string;
//    answer: {
//       id: string;
//       createdAt: string;
//       url: string;
//       author: string;
//       bodyHTML: string;
//       avatarUrl: string;
//    } | null;
//    bodyHTML?: string;
//    avatarUrl?: string;
// };

export type Likereq = {
   memberId: number;
   boardId: number;
   boardLike?: number;
};

export type PageInfo = {
   page: number; // 현재 페이지
   size: number; // 한 페이지에서 몇개가 보일지
   totalElements: number; // 전체 데이터가 몇개인지
   totalPages: number; // 전체 페이지가 몇개일지
};

export type ListData = {
   boardId: number;
   title: string;
   content: string;
   address: string;
   now: any;
   photo: any;
   pin: number;
   like: number;
   bookmark: number;
   nickName: string;
   userPhoto: any;
};
