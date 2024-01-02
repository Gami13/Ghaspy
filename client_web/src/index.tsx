/* @refresh reload */
import { render } from 'solid-js/web';
import 'solid-devtools';
import { Route, Router } from '@solidjs/router';
import Signup from './components/SignUp/SignUp';

import './index.css';

import Main from './Main';
import { AppStateProvider } from './AppState';
import UploadTest from './components/UploadTest/UploadTest';

const root = document.getElementById('root');
function App() {
	return (
		<AppStateProvider>
			<Router>
				<Route path="/" component={Main} />

				<Route path="login" component={Main} />
				<Route path="signup" component={Signup} />
				<Route path="uploadTest" component={UploadTest} />
			</Router>
		</AppStateProvider>
	);
}

render(() => <App />, root!);
