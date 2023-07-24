import { IdentifyOptions } from 'types/identify';

export function cpuClassSource(options: IdentifyOptions) {
	return navigator.cpuClass ? navigator.cpuClass : 'unknown';
}
