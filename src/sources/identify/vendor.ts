import { IdentifyOptions } from 'types/identify';

export function vendorSource(options: IdentifyOptions) {
	return navigator.vendor || '';
}
