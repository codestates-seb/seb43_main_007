export interface CommentType {
   boardId: number;
   commentId: number;
   nickname: string;
   userPhoto: string;
   content: string;
   createdAt: string;
   parentId: number;
   replies?: CommentType[];
}
