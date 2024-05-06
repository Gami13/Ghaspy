import { render } from "solid-js/web";
import "solid-devtools";
import { Route, Router } from "@solidjs/router";

import "./index.css";

import { AppStateProvider } from "./AppState";

import { Main } from "./components/Main";
import { Pallete } from "./components/Pallete";

import { ValidatePage } from "./components/ValidatePage";
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
	return (
		<>
			<AppStateProvider>
			
					<Router>
						<Route path="/" component={Main} />
						<Route path="/pallete" component={Pallete} />
						<Route path="validate/:token" component={ValidatePage} />
					</Router>
				
			</AppStateProvider>
		</>
	);
}

render(() => <App />, root);
