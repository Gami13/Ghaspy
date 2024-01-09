import { IconArrowBack, IconLink, IconMail } from '@tabler/icons-solidjs';
import style from './UserProfile.module.css';
import { useParams } from '@solidjs/router';
import { Match, ResourceActions, Show, Switch, createResource, createSignal } from 'solid-js';
import { API_URL, CDN_URL } from '@/constants';
import { useAppState } from '@/AppState';
import { IconUser, IconForklift } from '@tabler/icons-solidjs';

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
	const [isEditUser, setIsEditUser] = createSignal(false);
	const [filePath, setFilePath] = createSignal('');

	const [userData, _] = createResource<GetProfileResponse>(async () => {
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
	function handleEditUser() {
		return async (e: any) => {
			setIsEditUser(false);
			handleUpload(e);

			e.preventDefault();
		};
	}
	function handleUpload(e: any) {
		e.preventDefault();
		let file = e.target.uploadFile.files[0];
		console.log(file);
		let token = e.target.token.value;
		let formData = new FormData();
		formData.append('file', file);

		fetch(API_URL + '/setAvatar', {
			headers: {
				Authorization: `${token}`,
			},
			method: 'POST',
			body: formData,
		}).then((res) => res.json().then((data) => setFilePath(data.filename)));
	}
	return (
		<Show when={userData()}>
			<div class={style.main}>
				<Show when={isEditUser()}>
					<div class={style.overlay}>
						<div class={style.userEdit}>
							<button
								class={style.close}
								onclick={() => {
									setIsEditUser(false);
								}}
							>
								X
							</button>
							<h2>Edit Profile</h2>
							<form onsubmit={handleEditUser()}>
								<div class={style.furasLift}>
									<input type="file" name="uploadFile" id="marcinToFurasUpload" />

									<button
										title="Add image"
										type="button"
										onclick={(e) => {
											e.preventDefault();
											document.getElementById('marcinToFurasUpload')?.click();
										}}
									>
										<IconForklift />
									</button>
								</div>

								<div>
									<input type="file" name="uploadFile" id="avatarUpload" />

									<button
										title="Add image"
										type="button"
										onclick={(e) => {
											e.preventDefault();
											document.getElementById('avatarUpload')?.click();
										}}
									>
										<IconUser></IconUser>
									</button>
								</div>

								<label for="bio">Bio</label>
								<textarea name="bio" id="bio" cols="30" rows="10"></textarea>
								<button type="submit">Submit</button>
							</form>
						</div>
					</div>
				</Show>
				<section class={style.header}>
					<button title="return">
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
							<button title="copy-link" type="button">
								<IconLink />
							</button>

							<Show when={userData().areYouFollowing}>
								<button title="message">
									<IconMail />
								</button>
							</Show>

							<Switch>
								<Match when={userData().isYourProfile && AppState.isLoggedIn()}>
									<button
										class={style.secondaryAction}
										onclick={() => {
											setIsEditUser(true);
										}}
									>
										Edit Profile
									</button>
								</Match>
								<Match when={userData().areYouFollowing && AppState.isLoggedIn()}>
									<button class={style.secondaryAction}>Unfollow</button>
								</Match>
								<Match when={!userData().areYouFollowing && AppState.isLoggedIn()}>
									<button class={style.primaryAction}>Follow</button>
								</Match>
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
