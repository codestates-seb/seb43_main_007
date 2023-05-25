export type Tag = {
   tagId: number;
   tagName: string;
};

export type Comments = {
   nickname: string;
   userPhoto: string | null;
   content: string;
   createdAt: string;
   commentId: number;
   parentId: number;
};

export type Board = {
   boardId: number;
   memberId: number;
   title: string;
   content: string;
   address: string;
   now: string;
   photo: string;
   bookmark: number;
   nickName: string;
   userPhoto: string;
   category: string;
   pick: number;
   pin: number;
   likeCheck: number;
   likeCount: number;
   tags: Tag[];
   comments: Comments[];
};
