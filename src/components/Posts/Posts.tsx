import './posts.scss';
import { BsChatRightText, BsFillCursorFill } from 'react-icons/bs';
import { useState, useContext, useRef, useEffect } from 'react';
import { DataContextType, Post as PostProp, Comment } from '../../@types/data';
import { v4 as uuidv4 } from 'uuid';
import { DataContext } from '../../context/DataContext';

export default function Posts(): JSX.Element {
	const { posts } = useContext(DataContext) as DataContextType;

	return (
		<div>
			{posts
				.sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf())
				.map((post: PostProp) => {
					return (
						<div key={post.id}>
							<Post postObj={post} />
						</div>
					);
				})}
		</div>
	);
}

export function Post({ postObj }: any): JSX.Element {
	const [showComments, setShowComments] = useState<boolean>(false);
	const [comment, setComment] = useState<string>('');
	const [comments, setComments] = useState<Comment[]>([]);
	const [postComments, setPostComments] = useState<Comment[]>([]);
	const { addComment } = useContext(DataContext) as DataContextType;
	const commentArea = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		setPostComments(postObj.comments);
	}, [postObj]);

	const sendComment = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
		(e.key === 'Enter' || e.key === 'NumpadEnter') && !e.shiftKey && handleComment();
	};

	const handleComment = (): void => {
		const commentId = uuidv4();
		if (comment.trim() !== '') {
			const newComment: Comment = {
				id: commentId,
				content: comment,
				createdAt: new Date(),
				replys: [],
			};
			setComments([...comments, newComment]);
			addComment(newComment, postObj.id);
			setComment('');
			if (commentArea.current) commentArea.current.value = '';
		}
	};

	const getTimeDiff = () => {
		if (postObj.createdAt) {
			const diff: number = new Date().valueOf() - postObj.createdAt.valueOf();
			var days = Math.floor(diff / 86400000); // days
			var hours = Math.floor((diff % 86400000) / 3600000); // hours
			var mins = Math.round(((diff % 86400000) % 3600000) / 60000); // minutes
			return days > 0
				? days === 1
					? `Yesterday`
					: `${days} days ago`
				: hours > 0
				? hours === 1
					? `Last hour`
					: `${hours} hours ago`
				: mins > 1
				? `${mins} minutes ago`
				: `Just Now`;
		}
	};

	return (
		<>
			<div className='post shadow-sm  border border-1 bg-white rounded-4 mb-3 position-relative'>
				<div className='header p-4 pb-3 pt-2'>
					<div className='d-flex pt-2'>
						<div className='name w-100'>
							<div className=' d-flex align-items-center gap-1'>
								<div className='user-name fw-bold text-capitalize fs-5'>Mohammed Nasif</div>
							</div>
							<div className='date fw-light' title={postObj.createdAt && postObj.createdAt.toLocaleString()}>
								{getTimeDiff()}
							</div>
						</div>
					</div>
				</div>
				<p className='mb-1 lh-sm post-content mx-4'>{postObj.content}</p>
				{/* comment */}
				<div
					className={showComments ? 'btn pe-0 fw-bold text-danger' : 'btn pe-0'}
					onClick={() => {
						setShowComments((prev) => !prev);
					}}>
					<BsChatRightText className='icon' /> Comment
				</div>
				{showComments && (
					<div className='comments w-100 border-top border-1 px-4 py-2'>
						{/* add Comment */}
						<div className='row'>
							<div className='comment-body col-10'>
								<div className='user-name text-start fw-bold mb-1 text-capitalize fs-6'>Mohammed Nasif</div>
								<textarea
									className='w-100'
									ref={commentArea}
									rows={1}
									onChange={(e) => {
										setComment(e.target.value);
									}}
									onKeyDown={sendComment}></textarea>
							</div>
							<div className='btn h-25 align-self-center fs-4 ms-auto col-2' onClick={handleComment}>
								<BsFillCursorFill />
							</div>
						</div>
						{postComments.length !== 0 &&
							postComments.map((comment) => {
								return <Postcomment comment={comment} postId={postObj.id} key={comment.id} />;
							})}
					</div>
				)}
			</div>
		</>
	);
}

export function Postcomment({ comment, postId }: any): JSX.Element {
	const [showReplys, setShowReplys] = useState<boolean>(false);
	const [reply, setReply] = useState<string>('');
	const [replyParentId, setReplyParentId] = useState<string>('');
	const [replys, setReplys] = useState<Comment[]>([]);
	const { addReply } = useContext(DataContext) as DataContextType;
	const replyArea = useRef<HTMLTextAreaElement>(null);
	const sendReply = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		(e.key === 'Enter' || e.key === 'NumpadEnter') && !e.shiftKey && handleReply();
	};

	const handleReply = (): void => {
		const replyId = uuidv4();
		if (reply.trim() !== '') {
			const newReply: Comment = {
				id: replyId,
				content: reply,
				createdAt: new Date(),
				replys: [],
			};
			addReply(newReply, postId, replyParentId);
			setReplys([...replys, newReply]);
			setReply('');
			if (replyArea.current) replyArea.current.value = '';
		}
	};

	const getTimeDiff = () => {
		if (comment.createdAt) {
			const diff: number = new Date().valueOf() - comment.createdAt.valueOf();
			var days = Math.floor(diff / 86400000); // days
			var hours = Math.floor((diff % 86400000) / 3600000); // hours
			var mins = Math.round(((diff % 86400000) % 3600000) / 60000); // minutes
			return days > 0
				? days === 1
					? `Yesterday`
					: `${days} day ago`
				: hours > 0
				? hours === 1
					? `Last hour`
					: `${hours} hours ago`
				: mins > 1
				? `${mins} minutes ago`
				: `Just Now`;
		}
	};

	return (
		<div className='d-flex border-bottom border-1 mb-1' key={comment.Id}>
			<div className='comment-body'>
				<div className='user-name text-start fw-bold mb-1 text-capitalize fs-6'>Mohammed Nasif</div>
				<div className='date fw-light mb-2' title={comment.createdAt && comment.createdAt.toLocaleString()}>
					{getTimeDiff()}
				</div>
				<p className='comment-txt lh-sm mb-2 text-start fs-5'>{comment.content}</p>
				{/* Reply */}
				<div
					className={showReplys ? 'btn pe-0 fw-bold' : 'btn pe-0'}
					onClick={() => {
						setShowReplys((prev) => !prev);
						setReplyParentId(comment.id);
					}}>
					<BsChatRightText className='icon' /> Reply
				</div>
				{showReplys && (
					<div className='comments w-100 border-top border-1 px-4 py-2'>
						{comment.replys.length !== 0 &&
							comment.replys.map((reply: Comment) => {
								return <Postcomment comment={reply} postId={comment.id} key={reply.id} />;
							})}

						{/* add reply */}
						<div className='row'>
							<div className='comment-body col-10'>
								<div className='user-name text-start fw-bold mb-1 text-capitalize fs-6'>Mohammed Nasif</div>
								<textarea
									className='w-100'
									ref={replyArea}
									rows={1}
									onChange={(e) => {
										setReply(e.target.value);
									}}
									onKeyDown={sendReply}></textarea>
							</div>
							<div className='btn h-25 align-self-center fs-4 ms-auto col-2' onClick={handleReply}>
								<BsFillCursorFill />
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
