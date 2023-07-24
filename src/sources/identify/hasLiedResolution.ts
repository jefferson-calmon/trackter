import { IdentifyOptions } from 'types/identify';

export function hasLiedResolutionSource(options: IdentifyOptions) {
	return (
		screen.width < screen.availWidth || screen.height < screen.availHeight
	);
}
