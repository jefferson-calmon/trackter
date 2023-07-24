import { IdentifyOptions } from 'types/identify';

export function screenResolutionSource(options: IdentifyOptions) {
	let resolution = [];

	if (options.detectScreenOrientation && screen.height > screen.width) {
		resolution = [screen.height, screen.width];
	} else {
		resolution = [screen.width, screen.height];
	}

	return resolution;
}
