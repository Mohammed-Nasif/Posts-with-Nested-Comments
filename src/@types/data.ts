export interface Post {
	id: string;
	content: string;
	createdAt: Date;
	comments: Comment[];
}

export interface Comment {
	id: string;
	content: string;
	createdAt: Date;
	replys?: Comment[];
}

export type DataContextType = {
	posts: Post[];
	addPost: (post: Post) => void;
	addComment: (comment: Comment, id: string) => void;
	addReply: (reply: Comment, postId: string, replyParentId: string) => void;
};
