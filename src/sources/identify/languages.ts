import { IdentifyOptions } from 'types/identify';
import { isChromium, isChromium86OrNewer } from 'utils/browser';

export function languagesSource(options: IdentifyOptions) {
	const n = navigator;
	const result: string[][] = [];

	const language =
		n.language || n.userLanguage || n.browserLanguage || n.systemLanguage;
	if (language !== undefined) {
		result.push([language]);
	}

	if (Array.isArray(n.languages)) {
		if (!(isChromium() && isChromium86OrNewer())) {
			result.push(n.languages);
		}
	} else if (typeof n.languages === 'string') {
		const languages = n.languages as string;
		if (languages) {
			result.push(languages.split(','));
		}
	}

	return result;
}
