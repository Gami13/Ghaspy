import {
	IconUpload,
	IconPhoto,
	IconBookmark,
	IconChartBar,
	IconHeart,
	IconRepeat,
	IconMessageCircle,
	IconDots,
} from '@tabler/icons-solidjs';
import { A } from '@solidjs/router';
import style from './PostBar.module.css';
import { For, createSignal, onMount } from 'solid-js';
import { CDN_URL } from '@/constants';
import { useAppState } from '@/AppState';
import PostWriter from './PostWriter';
import Post from './Post';
import { PostT } from '@/types';
import { t } from '@/Translation';

export default function PostBar() {
	const AppState = useAppState();
	const [posts, setPosts] = createSignal<PostT[]>([]);

	onMount(() => {
		fetch('http://localhost:8080/postsChrono/0', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})
			.then((res) => {
				if (res.status == 200) {
					res.json().then((data: PostT[]) => {
						setPosts(data);
						console.log(data);
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});
	return (
		<div class={style.main}>
			<div class={style.content_header}>
				<button>{t.posts.posts()}</button>
				{/* <button>Following</button> */}
			</div>
			<PostWriter />

			<section class={style.posts}>
				<For each={posts()}>{(post) => <Post post={post} />}</For>
			</section>
		</div>
	);
}
