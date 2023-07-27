import { IdentifyOptions } from 'types/identify';

export function cookiesSource(options: IdentifyOptions) {
	const d = document;

	try {
		d.cookie = 'cookietest=1; SameSite=Strict;';
		const result = d.cookie.indexOf('cookietest=') !== -1;
		d.cookie =
			'cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT';
		return result;
	} catch (e) {
		return false;
	}
}
