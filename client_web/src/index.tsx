/* @refresh reload */
import { render } from 'solid-js/web';
import 'solid-devtools';
import { Route, Router } from '@solidjs/router';

import Signup from './components/SignUp/SignUp';

import './index.css';

import Main from './components/Main/Main';
import { AppStateProvider, useAppState } from './AppState';
import UploadTest from './components/Tests/UploadTest';
import AvatarTest from './components/Tests/AvatarTest';

import PostBar from './components/PostBar/PostBar';
import UserProfile from './components/UserProfile/UserProfile';
import Login from './components/Login/Login';
import { onMount } from 'solid-js';
import { API_URL } from './constants';
import PinsBar from './components/PostBar/PinsBar';

type GetProfileResponse = {
	id: bigint;
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
const root = document.getElementById('root');
function App() {
	const AppState = useAppState();
	onMount(() => {
		const token = window.localStorage.getItem('token');
		const userId = window.localStorage.getItem('userId');

		if (!token || !userId) return;
		fetch(API_URL + '/profile', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', Authorization: token },
		})
			.then((res) => {
				if (res.status == 200) {
					res.json().then((data: GetProfileResponse) => {
						window.localStorage.setItem('userId', data.id.toString());
						window.localStorage.setItem('token', token);
						AppState.setIsLoggedIn(true);
						AppState.setUserToken(token);
						AppState.setUserId(data.id.toString());
						AppState.setUserAvatar(data.avatar);
						AppState.setUserBanner(data.banner);
						AppState.setUserBio(data.bio);
						AppState.setUserDisplayName(data.displayName);
						AppState.setUserName(data.userName);
						AppState.setUserLikesCount(data.likeCount);
						AppState.setUserPostsCount(data.postCount);
						AppState.setUserFollowersCount(data.followerCount);
						AppState.setUserFollowingCount(data.followingCount);
						AppState.setUserIsFollowersPublic(data.isFollowersPublic);
						AppState.setUserIsFollowingPublic(data.isFollowingPublic);
						AppState.setUserIsPostsPublic(data.isPostsPublic);
						AppState.setUserIsLikesPublic(data.isLikesPublic);
					});
				} else {
					alert('INVALID TOKEN');
				}
			})
			.catch((err) => {
				console.log(err);
				alert("cant't connect to server");
			});
	});
	return (
		<AppStateProvider>
			<Router>
				<Route path="/" component={Main}>
					<Route path="/" component={PostBar} />
					<Route path="/:username" component={UserProfile} />
					<Route path="login" component={Login} />
					<Route path="signup" component={Signup} />
					<Route path="pins" component={PinsBar} />
				</Route>
				<Route path="uploadTest" component={UploadTest} />
				<Route path="avatarTest" component={AvatarTest} />
			</Router>
		</AppStateProvider>
	);
}

render(() => <App />, root!);
