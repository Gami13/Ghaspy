import { IconArrowBack, IconLink, IconMail, IconStackBack } from '@tabler/icons-solidjs';
import style from './UserProfile.module.css';
import { useParams, useSearchParams } from '@solidjs/router';
import { Match, ResourceActions, Show, Switch, createResource, createSignal, onMount } from 'solid-js';
import { API_URL, CDN_URL } from '@/constants';
import { useAppState } from '@/AppState';

type GetProfileResponse = {
	userName: string;
	displayName: string;
	bio: string;
	avatar: string;
	banner: string;
	likeCount: number;
	postCount: number;
	followerCount: number;
	followingCount: number;
	areYouFollowing: boolean;
	areYouFollowedBy: boolean;
	joinedAt: string;
	isFollowersPublic: boolean;
	isFollowingPublic: boolean;
	isPostsPublic: boolean;
	isLikesPublic: boolean;
	isYourProfile: boolean;
};
function localizeTime(time: string) {
	return new Intl.DateTimeFormat(useAppState().localeJsFromat(), {
		dateStyle: 'medium',
	}).format(Date.parse(time));
}
export default function UserProfile() {
	const params = useParams();
	const AppState = useAppState();
	const [userData, userDataAction] = createResource<GetProfileResponse>(async () => {
		const res = await fetch(`${API_URL}/profile/${params.username}`, {
			method: 'GET',
			headers: {
				Authorization: AppState.userToken() || '',
				'Content-Type': 'application/json',
			},
		});
		const data = await res.json();
		console.log(data);
		return data as GetProfileResponse;
	}) as [() => GetProfileResponse, ResourceActions<GetProfileResponse | undefined, unknown>];
	//
	// BANNER MUST BE 3:1, THIS WILL BE ENFORCED ON UPLOAD
	// AVATAR MUST BE 1:1, THIS WILL BE ENFORCED ON UPLOAD
	// TODO: ADD TRANSLATION
	return (
		<Show when={userData()}>
			<div class={style.main}>
				<section class={style.header}>
					<button>
						<IconArrowBack />
					</button>
					<h1>{userData().displayName || userData().userName || params.username || 'user'}</h1>
				</section>

				<section class={style.profile}>
					<object class={style.banner} data="http://fakeimg.pl/1080x360?text=PLACEHOLDER&font=museo" type="image/png">
						<img src={`${CDN_URL}${userData().banner}`} alt="" />
					</object>
					<div class={style.actions}>
						<div class={style.avatarContainer}>
							<object
								class={style.avatar}
								data="https://dummyimage.com/360x360/fc03d7.png?text=Avatar"
								type="image/png"
							>
								<img src={`${CDN_URL}${userData().avatar}`} alt="" />
							</object>
						</div>
						<div class={style.buttons}>
							<button type="button">
								<IconLink />
							</button>

							{/* <Show when={userData().areYouFollowing}> */}
							<button>
								<IconMail />
							</button>
							{/* </Show> */}
							<button class={style.primaryAction}>Follow</button>

							<Switch>
								<Match when={userData().isYourProfile && AppState.isLoggedIn()}>
									<button class={style.secondaryAction}>Edit Profile</button>
								</Match>
								<Match when={userData().areYouFollowing && AppState.isLoggedIn()}>
									<button class={style.secondaryAction}>Unfollow</button>
								</Match>
								{/* <Match when={!userData().areYouFollowing && AppState.isLoggedIn()}> */}
								{/* </Match> */}
							</Switch>
						</div>
					</div>
					<div class={style.names}>
						<h3>{userData().displayName || userData().userName || params.username || 'user'}</h3>
						<div class={style.username}>
							<h4>@{userData().userName || params.username || 'user'}</h4>
							<span class={style.tag}>You</span>
							<Switch>
								{/* <Match when={userData().isYourProfile}></Match> */}
								<Match when={userData().areYouFollowing && userData()?.areYouFollowedBy}>
									<button class={style.tag}>Mutual</button>
								</Match>
								<Match when={userData().areYouFollowedBy}>
									<button class={style.tag}>Follows you</button>
								</Match>
							</Switch>
						</div>
					</div>

					<p>{userData().bio}</p>

					<span>Joined: {localizeTime(userData().joinedAt)}</span>
					<div class={style.data}>
						<Show when={userData().isLikesPublic}>
							<span>
								<mark>{userData().likeCount || 0}</mark> Likes
							</span>
						</Show>
						<Show when={userData().isPostsPublic && !userData().areYouFollowing}>
							<span>
								<mark>{userData().postCount || 0}</mark> Posts
							</span>
						</Show>
						<Show when={userData().isFollowersPublic}>
							<span>
								<mark>{userData().followerCount || 0}</mark> Followers
							</span>
						</Show>

						<Show when={userData().isFollowingPublic}>
							<span>
								<mark>{userData().followingCount || 0}</mark> Following
							</span>
						</Show>
					</div>
				</section>
			</div>
		</Show>
	);
}
