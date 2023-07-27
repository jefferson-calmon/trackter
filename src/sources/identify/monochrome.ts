import { IdentifyOptions } from 'types/identify';

export function monochromeSource(options: IdentifyOptions) {
	const maxValueToCheck = 100;

	if (!matchMedia('(min-monochrome: 0)').matches) {
		return undefined;
	}

	for (let i = 0; i <= maxValueToCheck; ++i) {
		if (matchMedia(`(max-monochrome: ${i})`).matches) {
			return i;
		}
	}

	throw new Error('Too high value');
}
