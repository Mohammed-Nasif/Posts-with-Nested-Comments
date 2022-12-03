export interface Post {
	id: string;
	content: string;
	createdAt: Date;
}

export interface Comment {
	id: string;
	content: string;
	createdAt: Date;
}

export type DataContextType = {
	posts: Post[];
	addPost: (todo: Post) => void;
};
