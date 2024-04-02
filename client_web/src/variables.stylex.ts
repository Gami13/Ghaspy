import * as stylex from '@stylexjs/stylex';

// A constant can be used to avoid repeating the media query
const DARK = '@media (prefers-color-scheme: dark)';

//!THIS IS WRONG CAUSE EVERY GRADIENT GOES TO WHITE
//TODO: FIX
export const colors = stylex.defineVars({
	text50: { default: '#f0f2f4', [DARK]: '#0b0c0f' },
	text100: { default: '#e2e4e9', [DARK]: '#16181d' },
	text200: { default: '#c4c9d4', [DARK]: '#2b303b' },
	text300: { default: '#a7afbe', [DARK]: '#414958' },
	text400: { default: '#8a94a8', [DARK]: '#576175' },
	text500: { default: '#6c7993', [DARK]: '#6c7993' },
	text600: { default: '#576175', [DARK]: '#8a94a8' },
	text700: { default: '#414958', [DARK]: '#a7afbe' },
	text800: { default: '#2b303b', [DARK]: '#c4c9d4' },
	text900: { default: '#16181d', [DARK]: '#e2e4e9' },
	text950: { default: '#0b0c0f', [DARK]: '#f0f2f4' },

	background50: { default: '#eff1f5', [DARK]: '#0a0b10' },
	background100: { default: '#dfe2ec', [DARK]: '#131620' },
	background200: { default: '#bfc6d9', [DARK]: '#262d40' },
	background300: { default: '#9fa9c6', [DARK]: '#394360' },
	background400: { default: '#808cb3', [DARK]: '#4d5980' },
	background500: { default: '#60709f', [DARK]: '#60709f' },
	background600: { default: '#4d5980', [DARK]: '#808cb3' },
	background700: { default: '#394360', [DARK]: '#9fa9c6' },
	background800: { default: '#262d40', [DARK]: '#bfc6d9' },
	background900: { default: '#131620', [DARK]: '#dfe2ec' },
	background950: { default: '#0a0b10', [DARK]: '#eff1f5' },

	primary50: { default: '#e5f0ff', [DARK]: '#000a1a' },
	primary100: { default: '#cce0ff', [DARK]: '#001433' },
	primary200: { default: '#99c2ff', [DARK]: '#002966' },
	primary300: { default: '#66a3ff', [DARK]: '#003d99' },
	primary400: { default: '#3385ff', [DARK]: '#0052cc' },
	primary500: { default: '#0066ff', [DARK]: '#0066ff' },
	primary600: { default: '#0052cc', [DARK]: '#3385ff' },
	primary700: { default: '#003d99', [DARK]: '#66a3ff' },
	primary800: { default: '#002966', [DARK]: '#99c2ff' },
	primary900: { default: '#001433', [DARK]: '#cce0ff' },
	primary950: { default: '#000a1a', [DARK]: '#e5f0ff' },

	secondary50: { default: '#e9eefb', [DARK]: '#040816' },
	secondary100: { default: '#d4ddf7', [DARK]: '#08112b' },
	secondary200: { default: '#a9baef', [DARK]: '#102156' },
	secondary300: { default: '#7e98e7', [DARK]: '#183281' },
	secondary400: { default: '#5376df', [DARK]: '#2043ac' },
	secondary500: { default: '#2854d7', [DARK]: '#2854d7' },
	secondary600: { default: '#2043ac', [DARK]: '#5376df' },
	secondary700: { default: '#183281', [DARK]: '#7e98e7' },
	secondary800: { default: '#102156', [DARK]: '#a9baef' },
	secondary900: { default: '#08112b', [DARK]: '#d4ddf7' },
	secondary950: { default: '#040816', [DARK]: '#e9eefb' },

	accent50: { default: '#f9ecf6', [DARK]: '#130611' },
	accent100: { default: '#f3d8ee', [DARK]: '#270c22' },
	accent200: { default: '#e7b1dd', [DARK]: '#4e1844' },
	accent300: { default: '#da8bcc', [DARK]: '#742566' },
	accent400: { default: '#ce64bb', [DARK]: '#9b3188' },
	accent500: { default: '#c23da9', [DARK]: '#c23da9' },
	accent600: { default: '#9b3188', [DARK]: '#ce64bb' },
	accent700: { default: '#742566', [DARK]: '#da8bcc' },
	accent800: { default: '#4e1844', [DARK]: '#e7b1dd' },
	accent900: { default: '#270c22', [DARK]: '#f3d8ee' },
	accent950: { default: '#130611', [DARK]: '#f9ecf6' },
});
