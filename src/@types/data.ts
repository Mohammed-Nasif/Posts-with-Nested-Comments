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
}

export type DataContextType = {
	posts: Post[];
	addPost: (post: Post) => void;
	addComment: (comment: Comment, id: string) => void;
};
