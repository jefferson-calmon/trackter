import { IdentifyOptions } from 'types/identify';

export function colorDepthSource(options: IdentifyOptions) {
	return screen.colorDepth || -1;
}
