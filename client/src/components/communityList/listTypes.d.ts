export type Likereq = {
   memberId: number;
   boardId: number;
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
   pick: number;
   likeCheck: number;
   bookmark: number;
   nickName: string;
   userPhoto: any;
};
