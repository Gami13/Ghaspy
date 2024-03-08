/* @refresh reload */
import { render } from 'solid-js/web';
import 'solid-devtools';
import { Route, Router } from '@solidjs/router';

import './index.css';

import { AppStateProvider, useAppState } from './AppState';

import * as stylex from '@stylexjs/stylex';
import { Main } from './components/Main';

const styles = stylex.create({
	root: {
		fontFamily: 'Arial, sans-serif',
		width: '100vw',
		height: '100vh',
		margin: 0,
		padding: 0,
		backgroundColor: 'black',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const root = document.getElementsByTagName('body')[0];

function App() {
	const AppState = useAppState();

	return (
		<div {...stylex.attrs(styles.root)}>
			<AppStateProvider>
				<Router>
					<Route path="/" component={Main}></Route>
				</Router>
			</AppStateProvider>
		</div>
	);
}

render(() => <App />, root!);
