import { createContext, FC, useState } from 'react';
import { DataContextType, Post } from '../@types/data';

export const DataContext = createContext<DataContextType | null>(null);

interface Props {
	children: React.ReactNode;
}

const DataProvider: FC<Props> = ({ children }) => {
	const [posts, setPosts] = useState<Post[]>([]);

	const addPost = (post: Post) => {
		const newPost: Post = {
			id: post.id,
			content: post.content,
			createdAt: post.createdAt,
		};
		setPosts([...posts, newPost]);
		console.log(posts);
	};

	return <DataContext.Provider value={{ posts, addPost }}>{children}</DataContext.Provider>;
};

export default DataProvider;
