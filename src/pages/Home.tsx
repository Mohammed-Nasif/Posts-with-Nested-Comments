// Components
import AddPost from '../components/AddPost/AddPost';
import Posts from '../components/Posts/Posts';

export default function Home(): JSX.Element {
	return (
		<>
			<AddPost />
			<div style={{ marginTop: 50 + 'px' }}>
				<Posts />
			</div>
		</>
	);
}
