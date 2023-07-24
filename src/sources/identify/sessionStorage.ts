import { IdentifyOptions } from 'types/identify';

export function sessionStorageSource(options: IdentifyOptions) {
	try {
		return !!window.sessionStorage;
	} catch (e) {
		return !0;
	}
}
