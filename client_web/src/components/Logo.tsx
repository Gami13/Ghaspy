import logo1024x from "../Logos/logo1024x.svg";
import logo512x from "../Logos/logo512x.svg";
import logo256x from "../Logos/logo256x.svg";
import logo128x from "../Logos/logo128x.svg";
import logo64x from "../Logos/logo64x.svg";
import logo128xFace from "../Logos/logo128xFace.svg";
import logo128xSmoke from "../Logos/logo128xSmoke.svg";

import stylex from "@stylexjs/stylex";

const infinitySymbolMove = stylex.keyframes({
	// "0%": { left: "0", top: "0" },
	// "6.25%": { left: "25%", top: "25%" },
	// "12.5%": { left: "50%", top: "0" },
	// "18.75%": { left: "25%", top: "-25%" },
	// "25%": { left: "0", top: "0" },
	// "31.25%": { left: "-25%", top: "25%" },
	// "37.5%": { left: "-50%", top: "0" },
	// "43.75%": { left: "-25%", top: "-25%" },
	// "50%": { left: "0", top: "0" },
	// "56.25%": { left: "25%", top: "25%" },
	// "62.5%": { left: "0", top: "50%" },
	// "68.75%": { left: "-25%", top: "25%" },
	// "75%": { left: "0", top: "0" },
	// "81.25%": { left: "25%", top: "-25%" },
	// "87.5%": { left: "0", top: "-50%" },
	// "93.75%": { left: "-25%", top: "-25%" },
	// "100%": { left: "0", top: "0" },
	// center it
	"0%": { left: "50%", top: "50%" },
	"6.25%": { left: "75%", top: "25%" },
	"12.5%": { left: "100%", top: "50%" },
	"18.75%": { left: "75%", top: "75%" },
	"25%": { left: "50%", top: "50%" },
	"31.25%": { left: "25%", top: "25%" },
	"37.5%": { left: "0%", top: "50%" },
	"43.75%": { left: "25%", top: "75%" },
	"50%": { left: "50%", top: "50%" },
	"56.25%": { left: "75%", top: "25%" },

	"62.5%": { left: "50%", top: "0%" },
	"68.75%": { left: "25%", top: "25%" },
	"75%": { left: "50%", top: "50%" },
	"81.25%": { left: "75%", top: "75%" },
	"87.5%": { left: "50%", top: "100%" },
	"93.75%": { left: "25%", top: "75%" },

	"100%": { left: "50%", top: "50%" },
});
const styles = stylex.create({
	logoFace: {
		position: "absolute",
		animationName: infinitySymbolMove,
		animationDuration: "5s",
		animationIterationCount: "infinite",
		animationTimingFunction: "linear",
		animationDelay: "0s",
		zIndex: 10,
		outline: "red 1px solid",
		transform: "translate(-50%, -50%)",
	},
	logoSmoke: {
		position: "absolute",
		animationName: infinitySymbolMove,
		animationDuration: "5s",
		animationIterationCount: "infinite",
		animationTimingFunction: "linear",
		animationDelay: "0s",
		transform: "translate(-50%, -50%)",
	},
});

// C:\Users\sebci\Documents\GitHub\Ghaspy\Logos
//Logos
export default function Logo() {
	return (
		<>
			<img {...stylex.attrs(styles.logoFace)} src={logo128xFace} alt="Logo" />
			<img {...stylex.attrs(styles.logoSmoke)} src={logo128xSmoke} alt="Logo" />
		</>
	);
}
