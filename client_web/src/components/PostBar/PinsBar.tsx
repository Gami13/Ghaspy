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
import { getPins } from '@/api/utils';
import { t } from '@/Translation';

export default function PostBar() {
	const AppState = useAppState();
	const [posts, setPosts] = createSignal<PostT[]>([]);

	onMount(() => {
		getPins(AppState.userToken()).then((data) => {
			setPosts(data);
		});
	});
	return (
		<div class={style.main}>
			<div class={style.content_header}>
				<button>{t.nav.pins()}</button>
			</div>

			<section class={style.posts}>
				<For each={posts()}>{(post) => <Post post={post} />}</For>
			</section>
		</div>
	);
}
