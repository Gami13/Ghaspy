import {
	IconUpload,
	IconPhoto,
	IconBookmark,
	IconChartBar,
	IconHeart,
	IconRepeat,
	IconMessageCircle,
	IconDots,
	IconCross,
	IconTrash,
	IconBackspace,
	IconHeartBroken,
} from '@tabler/icons-solidjs';
import { A } from '@solidjs/router';
import style from './PostBar.module.css';
import { For, Show, createSignal, onMount } from 'solid-js';
import { CDN_URL } from '@/constants';
import { useAppState } from '@/AppState';
import PostWriter from './PostWriter';
import { PostT } from '@/types';
import Fallback from '@/fallback.png';
import { deletePost, toggleLike, togglePin } from '@/api/utils';

function localizeTime(time: string) {
	return new Intl.DateTimeFormat(useAppState().localeJsFromat(), {
		dateStyle: 'short',
	}).format(Date.parse(time));
}
export default function Post(props: { post: PostT }) {
	const AppState = useAppState();
	const [bookmarked, setBookmarked] = createSignal(false);
	const [liked, setLiked] = createSignal(false);
	const result = toggleLike(props.post.id, AppState.userToken());

	return (
		<article class={style.post}>
			{/* <object class={style.avatar} data={Fallback} type="image/png"> */}
			<img class={style.avatar} src={`${CDN_URL}${props.post.author.avatar}`} alt="TEMP" />
			{/* </object> */}
			<div class={style.postData}>
				<div class={style.userData}>
					<h4>{props.post.author.displayName}</h4>

					<A class={style.username} href={`/${props.post.author.userName}`}>
						<h5>@{props.post.author.userName}</h5>
					</A>
					<time>{localizeTime(props.post.timePosted)}</time>
					<Show when={AppState.isLoggedIn() && AppState.userId() == props.post.author.id}>
						<button
							class={style.deletePost}
							title="delete"
							onclick={() => {
								deletePost(props.post.id, AppState.userToken());
							}}
						>
							<IconTrash></IconTrash>
						</button>
					</Show>
				</div>
				<div class={style.postContent}>
					<p>{props.post.content}</p>
					<For each={props.post.attachments}>{(attachment) => <img src={`${CDN_URL}${attachment}`} alt="TEMP" />}</For>
				</div>
				<div class={style.postButtons}>
					<button title="reply">
						<IconMessageCircle></IconMessageCircle>
						{props.post.replyCount}
					</button>
					<button title="quote">
						<IconRepeat></IconRepeat>
						{props.post.quoteCount}
					</button>
					<button title="like">
						<IconHeart
							onclick={(e) => {
								setLiked(!liked());

								if (!result) {
									setLiked(!liked());
								}
								e.target.classList.add(liked() ? style.liked : style.notLiked);
								e.target.classList.remove(liked() ? style.notLiked : style.liked);
							}}
						></IconHeart>
						0
					</button>

					<button
						title="bookmark"
						onclick={() => {
							const result = togglePin(props.post.id, AppState.userToken());
							setBookmarked(!bookmarked());
							if (!result) {
								setBookmarked(!bookmarked());
							}
						}}
					>
						<IconBookmark
							onclick={(e) => {
								setLiked(!bookmarked());

								if (!result) {
									setLiked(!bookmarked());
								}
								e.target.classList.add(bookmarked() ? style.notBookmarked : style.bookmarked);
								e.target.classList.remove(bookmarked() ? style.bookmarked : style.notBookmarked);
							}}
						></IconBookmark>
					</button>
					<button title="copyLink">
						<IconUpload></IconUpload>
					</button>
				</div>
			</div>
		</article>
	);
}
