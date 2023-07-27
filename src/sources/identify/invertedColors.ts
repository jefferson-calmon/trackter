import { IdentifyOptions } from 'types/identify';

export function invertedColorsSource(options: IdentifyOptions) {
	if (doesMatch('inverted')) {
		return true;
	}
	if (doesMatch('none')) {
		return false;
	}
	return undefined;
}

function doesMatch(value: string) {
	return matchMedia(`(inverted-colors: ${value})`).matches;
}
