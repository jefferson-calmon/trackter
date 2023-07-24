import { IdentifyOptions } from 'types/identify';

export function hasLiedLanguagesSource(options: IdentifyOptions) {
	if ('undefined' != typeof navigator.languages)
		try {
			const e = navigator.languages[0].substr(0, 2);
			if (e !== navigator.language.substr(0, 2)) return !0;
		} catch (t) {
			return !0;
		}
	return !1;
}
