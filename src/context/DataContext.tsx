import { createContext, FC, useState } from 'react';
import { DataContextType, Post, Comment } from '../@types/data';

export const DataContext = createContext<DataContextType | null>(null);

interface Props {
	children: React.ReactNode;
}

const DataProvider: FC<Props> = ({ children }) => {
	const [posts, setPosts] = useState<Post[]>([]);

	const addPost = (post: Post): void => {
		const newPost: Post = {
			id: post.id,
			content: post.content,
			createdAt: post.createdAt,
			comments: [],
		};
		setPosts([...posts, newPost]);
		console.log(posts);
	};

	const addComment = (comment: Comment, id: string): void => {
		posts.forEach((post: Post) => {
			if (post.id === id) {
				post.comments.push(comment);
				setPosts([...posts]);
			}
		});
		console.log(posts);
	};

	return <DataContext.Provider value={{ posts, addPost, addComment }}>{children}</DataContext.Provider>;
};

export default DataProvider;
