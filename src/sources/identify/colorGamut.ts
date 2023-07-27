import { IdentifyOptions } from 'types/identify';

export function colorGamutSource(options: IdentifyOptions) {
	for (const gamut of ['rec2020', 'p3', 'srgb'] as const) {
		if (matchMedia(`(color-gamut: ${gamut})`).matches) {
			return gamut;
		}
	}

	return undefined;
}
