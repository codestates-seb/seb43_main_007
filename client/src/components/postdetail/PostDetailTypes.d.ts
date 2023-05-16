export interface PostDeleteModalProps {
   open: boolean;
   close: () => void;
}

export interface CommentType {
   boardId: number;
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

export interface CommentProps {
   comment: CommentType;
   handleReplySubmit: (commentId: number, content: string) => void;
   handleReplyClick: (commentId: number | null) => void;
   isReplySelected: boolean;
   selectedCommentId: number | null;
}

export interface CreateReplyProps {
   onSubmit: (content: string) => void;
   onCancel: () => void;
}

export interface CommentCharacterCountProps {
   maxLength: number;
}

export interface CommentCharacterCountReturn {
   value: string;
   characterCount: number;
   handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
   clearValue: () => void;
}

export interface ReplyProps {
   comment: CommentType;
}
