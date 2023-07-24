import { IdentifyOptions } from 'types/identify';

export function platformSource(options: IdentifyOptions) {
	return navigator.platform ? navigator.platform : 'unknown';
}
