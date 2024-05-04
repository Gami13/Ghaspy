import { colors } from "../../variables.stylex";
import stylex from "@stylexjs/stylex";

type LogInInputProps = {
	type: string;
	disabled?: boolean;
	name: string;
	placeholder?: string;
	label?: string;
};
const styles = stylex.create({
	label: {
		display: "flex",
		flexDirection: "column",
		gap: "0.25em",
		width: "100%",
	},
	input: {
		outline: "none",
		padding: "0.5em",
		paddingHorizontal: "1em",
		borderRadius: "0.5em",
		border: "none",
		backgroundColor: {
			default: colors.background200,
			":disabled": colors.background300,
		},

		color: {
			default: colors.text950,
			":disabled": colors.text500,
		},
		cursor: {
			":disabled": "not-allowed",
		},
	},
});
export function LogInInput(props: LogInInputProps) {
	return (
		<label for={props.type} {...stylex.attrs(styles.label)}>
			{props.label}
			<input
				disabled={props.disabled}
				type={props.type}
				name={props.name}
				id={props.name}
				{...stylex.attrs(styles.input)}
				placeholder={props.placeholder}
			/>
		</label>
	);
}
