import { IdentifyOptions } from 'types/identify';

export const enum ContrastPreference {
	Less = -1,
	None = 0,
	More = 1,
	// "Max" can be added in future
	ForcedColors = 10,
}

export function contrastSource(options: IdentifyOptions) {
	if (doesMatch('no-preference')) {
		return ContrastPreference.None;
	}
	if (doesMatch('high') || doesMatch('more')) {
		return ContrastPreference.More;
	}
	if (doesMatch('low') || doesMatch('less')) {
		return ContrastPreference.Less;
	}
	if (doesMatch('forced')) {
		return ContrastPreference.ForcedColors;
	}
	return undefined;
}

function doesMatch(value: string) {
	return matchMedia(`(prefers-contrast: ${value})`).matches;
}
