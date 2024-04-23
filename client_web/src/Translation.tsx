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

export function timeSince(date: string): string {
	const newDate = new Date(date);
	const difference = new Date().getTime() - newDate.getTime();
	const seconds = Math.floor(difference / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);
	const years = Math.floor(months / 12);
	if (years > 1) return t.relativeTime.past({ ago: t.relativeTime.yy({ x: years }) });
	if (years === 1) return t.relativeTime.past({ ago: t.relativeTime.y({ x: years }) });
	if (months > 1) return t.relativeTime.past({ ago: t.relativeTime.MM({ x: months }) });
	if (months === 1) return t.relativeTime.past({ ago: t.relativeTime.M({ x: months }) });
	if (days > 1) return t.relativeTime.past({ ago: t.relativeTime.dd({ x: days }) });
	if (days === 1) return t.relativeTime.past({ ago: t.relativeTime.d({ x: days }) });
	if (hours > 1) return t.relativeTime.past({ ago: t.relativeTime.hh({ x: hours }) });
	if (hours === 1) return t.relativeTime.past({ ago: t.relativeTime.h({ x: hours }) });
	if (minutes > 1) return t.relativeTime.past({ ago: t.relativeTime.mm({ x: minutes }) });
	if (minutes === 1) return t.relativeTime.past({ ago: t.relativeTime.m({ x: minutes }) });
	if (seconds > 1) return t.relativeTime.past({ ago: t.relativeTime.ss({ x: seconds }) });
	return t.relativeTime.past({ ago: t.relativeTime.s({ x: seconds }) });
}
