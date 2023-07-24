import { IdentifyOptions } from 'types/identify';

export function doNotTrackSource(options: IdentifyOptions) {
	return navigator.doNotTrack
		? navigator.doNotTrack
		: navigator.msDoNotTrack
		? navigator.msDoNotTrack
		: window.doNotTrack
		? window.doNotTrack
		: 'unknown';
}
