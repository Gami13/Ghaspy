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
	console.log('LIKE AND BOOKMARK', props.post.isBookmarked, props.post.isLiked);
	const AppState = useAppState();
	const [bookmarked, setBookmarked] = createSignal(props.post.isBookmarked);
	const [liked, setLiked] = createSignal(props.post.isLiked);
	const [likeCount, setLikeCount] = createSignal(props.post.likeCount);

	const isLikedDefault = props.post.isLiked;
	// const isBookmarkedDefault = props.post.isLiked

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
					<button
						title="like"
						onclick={async () => {
							setLiked(!liked());
							if (liked() && isLikedDefault) {
								setLikeCount(likeCount() + 1);
							}
							if (!liked() && isLikedDefault) {
								setLikeCount(likeCount() - 1);
							}
							const result = await toggleLike(props.post.id, AppState.userToken());

							if (!result) {
								setLiked(!liked());
								if (liked() && isLikedDefault) {
									setLikeCount(likeCount() + 1);
								}
								if (!liked() && isLikedDefault) {
									setLikeCount(likeCount() - 1);
								}
							}
						}}
					>
						<IconHeart classList={{ [style.liked]: liked(), [style.notLiked]: !liked() }} />
						{likeCount()}
					</button>

					<button
						title="bookmark"
						onclick={async () => {
							setBookmarked(!bookmarked());
							const result = await togglePin(props.post.id, AppState.userToken());
							if (!result) {
								setBookmarked(!bookmarked());
							}
						}}
					>
						<IconBookmark classList={{ [style.bookmarked]: bookmarked(), [style.notBookmarked]: !bookmarked() }} />
					</button>
					<button title="copyLink">
						<IconUpload></IconUpload>
					</button>
				</div>
			</div>
		</article>
	);
}
