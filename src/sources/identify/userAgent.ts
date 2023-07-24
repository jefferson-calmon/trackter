import { IdentifyOptions } from 'types/identify';

export function userAgentSource(options: IdentifyOptions) {
	return navigator.userAgent;
}
