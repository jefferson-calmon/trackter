import { IdentifyOptions } from 'types/identify';

export function osCpuSource(options: IdentifyOptions) {
	return navigator.oscpu;
}
