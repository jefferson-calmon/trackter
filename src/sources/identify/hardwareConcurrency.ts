import { IdentifyOptions } from 'types/identify';

export function hardwareConcurrencySource(options: IdentifyOptions) {
	return navigator.hardwareConcurrency
		? navigator.hardwareConcurrency
		: 'unknown';
}
