import { colors } from '../../variables.stylex';
import stylex from '@stylexjs/stylex';
import type { JSX } from 'solid-js';
export const InteractionButtonStyle = stylex.create({
  activityWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3em',
  },
  activityButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5em',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'color 0.2s',
    fontSize: '2em',
    color: colors.text500,
    ':hover': {
      color: colors.primary500,
    },
  },
});
export function InteractionButton(props: {
  icon: JSX.Element | Node;
  text?: string | number;
  onClick?: () => void;
}) {
  return (
    <li {...stylex.attrs(InteractionButtonStyle.activityWrapper)}>
      <button
        type="button"
        onclick={props.onClick}
        {...stylex.attrs(InteractionButtonStyle.activityButton)}
      >
        {props.icon}
      </button>
      {props.text}
    </li>
  );
}
