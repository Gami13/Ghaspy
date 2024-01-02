import { createMemo } from 'solid-js';
import * as i18n from '@solid-primitives/i18n';
import pl_PL from './Locales/pl_PL';
import en_US from './Locales/en_US';
import { useAppState } from './AppState';

export const dictionaries = {
	en_US: en_US,
	pl_PL: pl_PL,
} as const;

export type Locale = keyof typeof dictionaries;
export type AuthTransKeysT = keyof (typeof dictionaries)[Locale]['auth'];
export const AuthTransKeys = Object.keys(dictionaries.en_US.auth) as AuthTransKeysT[];

const AppState = useAppState();
const dict = createMemo(() => i18n.flatten(dictionaries[AppState.locale()]));
export const t = i18n.chainedTranslator(dictionaries[AppState.locale()], i18n.translator(dict, i18n.resolveTemplate));
