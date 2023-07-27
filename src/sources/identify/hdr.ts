import { IdentifyOptions } from 'types/identify';

export function hdrSource(options: IdentifyOptions) {
	if (doesMatch('high')) {
		return true;
	}
	if (doesMatch('standard')) {
		return false;
	}
	return undefined;
}

function doesMatch(value: string) {
	return matchMedia(`(dynamic-range: ${value})`).matches;
}
