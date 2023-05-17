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

export interface Tag {
   tagId: number;
   tagName: string;
}

export interface Post {
   boardId: number;
   title: string;
   content: string;
   address: string | null;
   now: string;
   photo: string;
   like: number;
   bookmark: number;
   nickName: string;
   userPhoto: string;
   tags: Tag[];
}

export interface MatchParams {
   boardId: string;
}

export type PostDetailProps = RouteComponentProps<MatchParams>;

export interface PostTitleProps {
   title: string;
   now: string;
   like: number;
   bookmark: number;
   nickName: string;
   userPhoto: string;
}

export interface Content {
   content: string;
}

export interface Tags {
   tagId: number;
   tagName: string;
}
export interface PostTagProps {
   tags: Tag[];
}
