import './addpost.scss';
import { useRef, useState, useContext } from 'react';
import { BsFillCursorFill, BsPencil, BsPencilSquare } from 'react-icons/bs';
import { Post, DataContextType } from '../../@types/data';
import { v4 as uuidv4 } from 'uuid';
import { DataContext } from './../../context/DataContext';

export default function AddPost(): JSX.Element {
	const txtarea = useRef<HTMLTextAreaElement>(null);
	const [postText, setPostText] = useState<string>('');
	const [isActive, setisACtive] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const { addPost, posts } = useContext(DataContext) as DataContextType;

	const createPost = () => {
		setisACtive(true);
		if (txtarea.current) txtarea.current.focus();
	};

	const clean = (): void => {
		if (txtarea.current) txtarea.current.value = '';
		setisACtive(false);
		setPostText('');
		setIsError(false);
	};

	const handleSubmit = (): void => {
		const postId = uuidv4();
		if (postText.trim() !== '') {
			const newPost: Post = {
				id: postId,
				content: postText,
				createdAt: new Date(),
			};
			addPost(newPost);
			console.log(posts);
			clean();
		} else {
			setIsError(true);
		}
	};

	return (
		<>
			<div className='add-new-post border border-1 rounded-4 w-25 py-2 fixed-top mt-5 m-auto'>
				<div className='row px-3'>
					<div className='col-1'>
						<BsPencil className='icon border-1' />
					</div>
					<div className='col-10'>
						<textarea
							ref={txtarea}
							onChange={(e) => {
								if (e.target.value) setisACtive(true);
								setPostText(e.target.value);
								setIsError(false);
							}}
							id='newpost'
							rows={isActive ? 5 : 1}
							placeholder='write something...'
							maxLength={350}
							className={postText.length === 350 ? 'text-muted' : ''}
						/>
					</div>
					{isActive && (
						<div className='col-1'>
							<div className='btn text-muted p-0' onClick={clean}>
								x
							</div>
						</div>
					)}
					{isActive && isError && <p className='alert alert-danger'>You Should Write Something</p>}
				</div>
				<hr className='my-1' />
				<div className='buttons-wrapper px-3 text-center d-flex justify-content-around'>
					{!isActive ? (
						<div className='btn py-0' onClick={createPost}>
							Create new post <BsPencilSquare />
						</div>
					) : (
						<>
							<div className='btn py-0' onClick={handleSubmit}>
								<BsFillCursorFill /> Post
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}
