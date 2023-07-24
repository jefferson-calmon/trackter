import { IdentifyOptions } from 'types/identify';

export function timezoneOffsetSource(options: IdentifyOptions) {
	return new Date().getTimezoneOffset();
}
