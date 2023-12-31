/* @refresh reload */
import { render } from 'solid-js/web';
import 'solid-devtools';
import { Route, Router } from '@solidjs/router';

import './index.css';

import Main from './Main';
import { AppStateProvider } from './AppState';

const root = document.getElementById('root');
function App() {
	return (
		<AppStateProvider>
			<Router>
				<Route path="/" component={Main} />
			</Router>
		</AppStateProvider>
	);
}

render(() => <App />, root!);
