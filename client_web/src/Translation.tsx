import { createMemo } from "solid-js";
import * as i18n from "@solid-primitives/i18n";
import { pl_PL } from "./Locales/pl_PL";
import { en_US } from "./Locales/en_US";
import { useAppState } from "./AppState";

export const dictionaries = {
	en_US: en_US,
	pl_PL: pl_PL,
} as const;

export type Locale = keyof typeof dictionaries;
export type AuthTransKeysT = keyof (typeof dictionaries)[Locale]["authErrors"];
export const AuthTransKeys = Object.keys(dictionaries.en_US.authErrors) as AuthTransKeysT[];
export type LoginTransKeysT = keyof (typeof dictionaries)[Locale]["login"];
export const LoginTransKeys = Object.keys(dictionaries.en_US.login) as LoginTransKeysT[];

const AppState = useAppState();
const dict = createMemo(() => i18n.flatten(dictionaries[AppState.locale()]));
export const t = i18n.chainedTranslator(dictionaries[AppState.locale()], i18n.translator(dict, i18n.resolveTemplate));

export function formatDate(date: string): string {
	return Intl.DateTimeFormat(AppState.localeJsFromat(), {
		dateStyle: "full",
		timeStyle: "medium",
	}).format(new Date(date));
}

const SECOND = 1000;
const SECONDS = SECOND * 1.5;
const MINUTE = 60 * SECOND;
const MINUTES = MINUTE * 1.5;
const HOUR = 60 * MINUTE;
const HOURS = HOUR * 1.5;
const DAY = 24 * HOUR;
const DAYS = DAY * 1.5;
const MONTH = 30 * DAY;
const MONTHS = MONTH * 1.5;
const YEAR = 12 * MONTH;
const YEARS = YEAR * 1.5;

export function timeSince(date: string): string {
	const difference = new Date().getTime() - new Date(date).getTime();
	if (difference >= YEARS) return t.relativeTime.past({ ago: t.relativeTime.yy({ x: Math.floor(difference / YEAR) }) });
	if (difference >= YEAR) return t.relativeTime.past({ ago: t.relativeTime.y({ x: 1 }) });
	if (difference >= MONTHS) return t.relativeTime.past({ ago: t.relativeTime.MM({ x: Math.floor(difference / MONTH) }) });
	if (difference >= MONTH) return t.relativeTime.past({ ago: t.relativeTime.M({ x: 1 }) });
	if (difference >= DAYS) return t.relativeTime.past({ ago: t.relativeTime.dd({ x: Math.floor(difference / DAY) }) });
	if (difference >= DAY) return t.relativeTime.past({ ago: t.relativeTime.d({ x: 1 }) });
	if (difference >= HOURS) return t.relativeTime.past({ ago: t.relativeTime.hh({ x: difference / HOUR }) });
	if (difference >= HOUR) return t.relativeTime.past({ ago: t.relativeTime.h({ x: 1 }) });
	if (difference >= MINUTES) return t.relativeTime.past({ ago: t.relativeTime.mm({ x: Math.floor(difference / MINUTE) }) });
	if (difference >= MINUTE) return t.relativeTime.past({ ago: t.relativeTime.m({ x: 1 }) });
	if (difference >= SECONDS) return t.relativeTime.past({ ago: t.relativeTime.ss({ x: Math.floor(difference / SECOND) }) });
	return t.relativeTime.past({ ago: t.relativeTime.s({ x: 1 }) });
}
