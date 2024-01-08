/* @refresh reload */
import { render } from 'solid-js/web';
import 'solid-devtools';
import { Route, Router } from '@solidjs/router';
import Signup from './components/SignUp/SignUp';

import './index.css';

import Main from './components/Main/Main';
import { AppStateProvider } from './AppState';
import UploadTest from './components/Tests/UploadTest';
import AvatarTest from './components/Tests/AvatarTest';
import Navbar from './components/Navbar/Navbar';
import PostBar from './components/PostBar/PostBar';
import UserProfile from './components/UserProfile/UserProfile';
import Login from './components/Login/Login';

const root = document.getElementById('root');
function App() {
	return (
		<AppStateProvider>
			<Router>
				<Route path="/" component={Main}>
					<Route path="/" component={PostBar} />
					<Route path="/:username" component={UserProfile} />
					<Route path="login" component={Login} />
					<Route path="signup" component={Signup} />
				</Route>
				<Route path="uploadTest" component={UploadTest} />
				<Route path="avatarTest" component={AvatarTest} />
			</Router>
		</AppStateProvider>
	);
}

render(() => <App />, root!);
