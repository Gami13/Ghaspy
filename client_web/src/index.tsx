/* @refresh reload */
import { render } from 'solid-js/web';
import 'solid-devtools';
import { Route, Router } from '@solidjs/router';

import './index.css';

import { AppStateProvider, useAppState } from './AppState';

import { onMount } from 'solid-js';
import { API_URL } from './constants';

import * as stylex from '@stylexjs/stylex';
import { Main } from './components/Main';

const styles = stylex.create({
	root: {
		width: '100%',

		backgroundColor: 'red',
	},
});

const root = document.getElementsByTagName('body')[0];
function App() {
	const AppState = useAppState();

	return (
		<div {...stylex.props(styles.root)}>
			<AppStateProvider>
				<Router>
					<Route path="/" component={Main}></Route>
				</Router>
			</AppStateProvider>
		</div>
	);
}

render(() => <App />, root!);
