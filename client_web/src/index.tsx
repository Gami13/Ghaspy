import { render } from "solid-js/web";
import "solid-devtools";
import { Route, Router } from "@solidjs/router";

import "./index.css";
import { PostDetail } from "./components/Post/PostDetail";
import { AppStateProvider } from "./AppState";
import { UserProfile } from "./components/UserProfile/UserProfile";
import { NavWrapper } from "./components/NavWrapper";
import { Pallete } from "./components/Pallete";

import { ValidatePage } from "./components/ValidatePage";
import { Main } from "./components/Main";
import { onMount } from "solid-js";
import { BookmarksRoute } from "./components/Bookmarks/BookmarksRoute";
//stylex example
// const styles = stylex.create({
// 	name of class: {
// 		fontFamily: 'Arial, sans-serif',
// 		width: '100vw',
// 		height: '100vh',
// 		margin: 0,
// 		padding: 0,
// 		backgroundColor: 'black',
// 		display: 'flex',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// });
//<div {...stylex.attrs(styles.root)}>
const root = document.getElementsByTagName("body")[0];

function App() {
	onMount(() => {
		window.addEventListener(
			"dragover",
			(e) => {
				e.preventDefault();
			},
			false,
		);
		window.addEventListener(
			"drop",
			(e) => {
				e.preventDefault();
			},
			false,
		);
	});
	return (
		<>
			<AppStateProvider>
				<Router>
					<Route path="/" component={NavWrapper}>
						<Route path="/" component={Main} />
						<Route path="/bookmarks" component={BookmarksRoute} />
						<Route path="/pallete" component={Pallete} />
						<Route path="validate/:token" component={ValidatePage} />

						<Route path="/:username/:postID" component={PostDetail} />
						<Route path="/:username" component={UserProfile} />
					</Route>
				</Router>
			</AppStateProvider>
		</>
	);
}

render(() => <App />, root);
