import { IdentifyOptions } from 'types/identify';

export function languageSource(options: IdentifyOptions) {
	return (
		navigator.language ||
		navigator.userLanguage ||
		navigator.browserLanguage ||
		navigator.systemLanguage ||
		''
	);
}
