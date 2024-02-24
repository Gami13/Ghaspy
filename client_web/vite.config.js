import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import postcss_nested from 'postcss-nested';
import tsconfigPaths from 'vite-tsconfig-paths';
import styleX from 'vite-plugin-stylex';
import solid from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';
export default defineConfig({
	plugins: [
		tsconfigPaths(),
		solid(),
		styleX(),
		devtools({
			autoname: true,
		}),
	],
	css: {
		postcss: {
			plugins: [autoprefixer, postcss_nested],
		},
	},
	server: {
		port: 3000,
	},
});
