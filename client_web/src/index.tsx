/* @refresh reload */
import { render } from 'solid-js/web';
import 'solid-devtools';
import { Route, Router } from '@solidjs/router';
import Signup from './SignUp';

import './index.css';

import Main from './Main';
import { AppStateProvider } from './AppState';

const root = document.getElementById('root');
function App() {
	return (
		<AppStateProvider>
			<Router>
				<Route path="/" component={Main} />
				<Route path="register" component={Signup} />

				<Route path="login" component={Main} />
				<Route path="signup" component={Main} />
			</Router>
		</AppStateProvider>
	);
}

render(() => <App />, root!);
