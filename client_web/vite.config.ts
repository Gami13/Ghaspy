import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import postcss_nested from 'postcss-nested';
import tsconfigPaths from 'vite-tsconfig-paths';
import solid from 'vite-plugin-solid';

export default defineConfig({
	plugins: [tsconfigPaths(), solid()],
	css: {
		postcss: {
			plugins: [autoprefixer, postcss_nested],
		},
	},
});
