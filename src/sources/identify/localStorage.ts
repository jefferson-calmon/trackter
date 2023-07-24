import { IdentifyOptions } from 'types/identify';

export function localStorageSource(options: IdentifyOptions) {
	try {
		return !!window.localStorage;
	} catch (e) {
		return !0;
	}
}
