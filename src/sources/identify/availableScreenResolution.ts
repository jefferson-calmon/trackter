import { IdentifyOptions } from 'types/identify';

export function availableScreenResolutionSource(options: IdentifyOptions) {
	let availableResolution;

	if (screen.availWidth && screen.availHeight) {
		if (options.detectScreenOrientation) {
			availableResolution =
				screen.availHeight > screen.availWidth
					? [screen.availHeight, screen.availWidth]
					: [screen.availWidth, screen.availHeight];
		} else {
			availableResolution = [screen.availHeight, screen.availWidth];
		}
	}

	return availableResolution;
}
