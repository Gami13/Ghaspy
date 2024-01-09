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

export default function PostBar() {
	const AppState = useAppState();
	type GetPostsResponse = {
		id: number;
		authorId: number;
		context: string;
		replyTo: number;
		quoteOf: number;
		attechments: string[];
	};

	onMount(() => {
		fetch('http://localhost:8080/postsChrono', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})
			.then((res) => {
				if (res.status == 200) {
					res.json().then((data: GetPostsResponse[]) => {
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
				<article class={style.post}>
					<object class={style.avatar} data="https://dummyimage.com/360x360/fc03d7.png?text=Avatar" type="image/png">
						<img src={`${CDN_URL}${AppState.userAvatar()}`} alt="TEMP" />
					</object>
					<div class={style.postData}>
						<div class={style.userData}>
							<h4>username</h4> <h4>tag</h4> <h4>time</h4> <IconDots></IconDots>
						</div>
						<div class={style.postContent}>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio nesciunt animi enim veniam, dolor
								recusandae eligendi dolores obcaecati sit molestiae blanditiis veritatis assumenda placeat perspiciatis
								officiis molestias cumque at! Odio!
							</p>
							<object
								class={style.avatar}
								data="https://dummyimage.com/360x360/fc03d7.png?text=Avatar"
								type="image/png"
							>
								<img src={`${CDN_URL}${AppState.userAvatar()}`} alt="TEMP" />
							</object>
						</div>
						<div class={style.postButtons}>
							<button title="coment">
								<IconMessageCircle></IconMessageCircle>
								XXX
							</button>
							<button title="repost">
								<IconRepeat></IconRepeat>
								XXX
							</button>
							<button title="like">
								<IconHeart></IconHeart>
								XXX
							</button>
							<button title="view">
								<IconChartBar></IconChartBar>
								XXX
							</button>

							<button title="bookmark">
								<IconBookmark></IconBookmark>
							</button>
							<button title="upload">
								<IconUpload></IconUpload>
							</button>
						</div>
					</div>
				</article>
			</section>
		</div>
	);
}
