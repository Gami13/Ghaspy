import { createMemo } from "solid-js";
import * as i18n from "@solid-primitives/i18n";
import pl_PL from "./Locales/pl_PL.json";
import en_US from "./Locales/en_US.json";
import { useAppState } from "./AppState";

export const dictionaries = {
	en_US: en_US,
	pl_PL: pl_PL,
} as const;

export type Locales = keyof typeof dictionaries;

export type ErrorTransKeys = keyof (typeof dictionaries)["pl_PL"]["errors"];
export type SuccessTransKeys = keyof (typeof dictionaries)["pl_PL"]["success"];
//TODO: Put this thingy in a component so it can be cleaned up
const AppState = useAppState();

//Remember to change to en_US when I finish translating
const dict = createMemo(() =>
	Object.assign(
		i18n.flatten(dictionaries.pl_PL),
		i18n.flatten(dictionaries[AppState.locale()]),
	),
);
export const t = i18n.chainedTranslator(
	dictionaries.pl_PL,
	i18n.translator(dict, i18n.resolveTemplate),
);

export function formatDate(date: string): string {
	return Intl.DateTimeFormat(AppState.localeJsFromat(), {
		dateStyle: "full",
		timeStyle: "medium",
	}).format(new Date(date));
}

const SECOND = 1000;
const SECONDS_THRESHOLD = SECOND * 1.5;
const MINUTE = 60 * SECOND;
const MINUTES_THRESHOLD = MINUTE * 1.5;
const HOUR = 60 * MINUTE;
const HOURS_THRESHOLD = HOUR * 1.5;
const DAY = 24 * HOUR;
const DAYS_THRESHOLD = DAY * 1.5;
const MONTH = 30 * DAY;
const MONTHS_THRESHOLD = MONTH * 1.5;
const YEAR = 12 * MONTH;
const YEARS_THRESHOLD = YEAR * 1.5;

export function timeSince(date: string): string {
	const difference = new Date().getTime() - new Date(date).getTime();
	if (difference >= YEARS_THRESHOLD)
		return t.relativeTime.past({
			ago: t.relativeTime.yy({ x: Math.floor(difference / YEAR) }),
		});
	if (difference >= YEAR)
		return t.relativeTime.past({ ago: t.relativeTime.y({ x: 1 }) });
	if (difference >= MONTHS_THRESHOLD)
		return t.relativeTime.past({
			ago: t.relativeTime.MM({ x: Math.floor(difference / MONTH) }),
		});
	if (difference >= MONTH)
		return t.relativeTime.past({ ago: t.relativeTime.M({ x: 1 }) });
	if (difference >= DAYS_THRESHOLD)
		return t.relativeTime.past({
			ago: t.relativeTime.dd({ x: Math.floor(difference / DAY) }),
		});
	if (difference >= DAY)
		return t.relativeTime.past({ ago: t.relativeTime.d({ x: 1 }) });
	if (difference >= HOURS_THRESHOLD)
		return t.relativeTime.past({
			ago: t.relativeTime.hh({ x: Math.floor(difference / HOUR) }),
		});
	if (difference >= HOUR)
		return t.relativeTime.past({ ago: t.relativeTime.h({ x: 1 }) });
	if (difference >= MINUTES_THRESHOLD)
		return t.relativeTime.past({
			ago: t.relativeTime.mm({ x: Math.floor(difference / MINUTE) }),
		});
	if (difference >= MINUTE)
		return t.relativeTime.past({ ago: t.relativeTime.m({ x: 1 }) });
	if (difference >= SECONDS_THRESHOLD)
		return t.relativeTime.past({
			ago: t.relativeTime.ss({ x: Math.floor(difference / SECOND) }),
		});
	return t.relativeTime.past({
		ago: t.relativeTime.s({ x: Math.floor(difference / SECOND) }),
	});
}
