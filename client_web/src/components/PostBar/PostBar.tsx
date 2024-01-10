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
import { createSignal, onMount } from 'solid-js';
import { CDN_URL } from '@/constants';
import { useAppState } from '@/AppState';
import PostWriter from './PostWriter';
import Post from './Post';

export default function PostBar() {
	const AppState = useAppState();
	type UserShort = {
		id: BigInt;
		userName: string;
		displayName: string;
		avatar: string;
		banner: string;
		bio: string;
	};
	type Post = {
		id: BigInt;
		author: UserShort;
		content: string;
		replyTo: Post | null;
		quoteOf: Post | null;
		likesCount: number;
		quoteCount: number;
		replyCount: number;
		timePosted: string;
	};

	onMount(() => {
		fetch('http://localhost:8080/postsChrono/0', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})
			.then((res) => {
				if (res.status == 200) {
					res.json().then((data: Post[]) => {
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
				<button>For You</button>
				<button>Following</button>
			</div>
			<PostWriter />

			<section class={style.posts}>
				<Post />
			</section>
		</div>
	);
}
