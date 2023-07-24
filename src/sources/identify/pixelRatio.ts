import { IdentifyOptions } from 'types/identify';

export function pixelRatioSource(options: IdentifyOptions) {
	return window.devicePixelRatio;
}
