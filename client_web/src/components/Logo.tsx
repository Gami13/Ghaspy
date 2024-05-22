import logo1024x from "../Logos/logo1024x.svg";
import logo512x from "../Logos/logo512x.svg";
import logo256x from "../Logos/logo256x.svg";
import logo128x from "../Logos/logo128x.svg";
import logo64x from "../Logos/logo64x.svg";
import logo128xFace from "../Logos/logo128xFace.svg";
import logo128xSmoke from "../Logos/logo128xSmoke.svg";

import stylex from "@stylexjs/stylex";

const styles = stylex.create({
	logoFace: {
		position: "absolute",

		zIndex: 10,
	},
	logoSmoke: {
		position: "absolute",
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
