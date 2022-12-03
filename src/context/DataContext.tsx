import { createContext, FC, useState } from 'react';
import { DataContextType, Post, Comment } from '../@types/data';

export const DataContext = createContext<DataContextType | null>(null);

interface Props {
	children: React.ReactNode;
}

const DataProvider: FC<Props> = ({ children }) => {
	const INITIAL_Data: Post[] = [
		{
			id: '99e37e42-80fd-4a04-b6f6-9e9c30578e66',
			content: 'Hi, Ramy!',
			createdAt: new Date('2022-12-03T21:12:05.544Z'),
			comments: [
				{
					id: 'a34303e4-2dc6-46d4-ac3c-8b2e989b05c1',
					content: 'Nice to see you.',
					createdAt: new Date('2022-12-03T21:12:21.727Z'),
					replys: [
						{
							id: '8d518b05-95bf-4b98-865b-d6e94c7dfe75',
							content: 'Reply 1',
							createdAt: new Date('2022-12-03T21:12:35.088Z'),
							replys: [
								{
									id: '017c5a11-151d-4396-a6d3-05bd83b5d0a6',
									content: 'Reply 1.1',
									createdAt: new Date('2022-12-03T21:12:41.239Z'),
									replys: [
										{
											id: 'c6414c75-99fb-480c-a933-3fa96d7b9c63',
											content: 'Reply 1.1.1',
											createdAt: new Date('2022-12-03T21:13:02.958Z'),
											replys: [
												{
													id: '2d187a1f-269b-4ce6-9a41-f27cdd0d0504',
													content: 'Reply 1.1.1.1',
													createdAt: new Date('2022-12-03T21:13:17.381Z'),
													replys: [
														{
															id: '8cd69aaf-931b-4c42-abd7-6ecdcffc96ed',
															content: 'Soooo !!',
															createdAt: new Date('2022-12-03T21:13:24.900Z'),
															replys: [],
														},
													],
												},
											],
										},
									],
								},
							],
						},
					],
				},
			],
		},
	];
	
	const [posts, setPosts] = useState<Post[]>(INITIAL_Data);

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

	const addReply = (reply: Comment, postId: string, replyParetntId: string): void => {
		posts.forEach((post: Post) => {
			function findNestedObj(entireObj: Post, keyToFind: any, valToFind: string) {
				let foundObj;
				JSON.stringify(entireObj, (_, nestedValue) => {
					if (nestedValue && nestedValue[keyToFind] === valToFind) {
						foundObj = nestedValue;
					}
					return nestedValue;
				});
				return foundObj;
			}
			const obj: Comment = findNestedObj(post, 'id', replyParetntId) || { id: '', content: '', createdAt: new Date() };
			if (obj) {
				obj.replys?.push(reply);
				setPosts([...posts]);
			}
		});
	};

	return <DataContext.Provider value={{ posts, addPost, addComment, addReply }}>{children}</DataContext.Provider>;
};

export default DataProvider;
