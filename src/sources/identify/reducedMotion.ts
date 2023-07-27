import { IdentifyOptions } from 'types/identify';

export function reducedMotionSource(options: IdentifyOptions) {
	if (doesMatch('reduce')) {
		return true;
	}
	if (doesMatch('no-preference')) {
		return false;
	}
	return undefined;
}

function doesMatch(value: string) {
	return matchMedia(`(prefers-reduced-motion: ${value})`).matches;
}
