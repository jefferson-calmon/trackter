import { IdentifyOptions } from 'types/identify';
import { replaceNaN, round, toFloat } from '../../utils/data';
import { exitFullscreen, getFullscreenElement } from '../../utils/browser';

type FrameSize = [number | null, number | null, number | null, number | null];

const screenFrameCheckInterval = 2500;
const roundingPrecision = 10;

let screenFrameBackup: Readonly<FrameSize> | undefined;
let screenFrameSizeTimeoutId: number | undefined;

export function screenFrameSource(options: IdentifyOptions) {
	watchScreenFrame();

	return async () => {
		let frameSize = getCurrentScreenFrame();

		if (isFrameSizeNull(frameSize)) {
			if (screenFrameBackup) {
				return [...screenFrameBackup];
			}

			if (getFullscreenElement()) {
				await exitFullscreen();
				frameSize = getCurrentScreenFrame();
			}
		}

		if (!isFrameSizeNull(frameSize)) {
			screenFrameBackup = frameSize;
		}

		return frameSize;
	};
}

function watchScreenFrame() {
	if (screenFrameSizeTimeoutId !== undefined) {
		return;
	}
	const checkScreenFrame = () => {
		const frameSize = getCurrentScreenFrame();
		if (isFrameSizeNull(frameSize)) {
			screenFrameSizeTimeoutId = (setTimeout as typeof window.setTimeout)(
				checkScreenFrame,
				screenFrameCheckInterval
			);
		} else {
			screenFrameBackup = frameSize;
			screenFrameSizeTimeoutId = undefined;
		}
	};
	checkScreenFrame();
}

export function roundedScreenFrameSource(): () => Promise<FrameSize> {
	const screenFrameGetter = screenFrameSource({});

	return async () => {
		const frameSize = await screenFrameGetter();
		const processSize = (sideSize: FrameSize[number]) =>
			sideSize === null ? null : round(sideSize, roundingPrecision);

		// It might look like I don't know about `for` and `map`.
		// In fact, such code is used to avoid TypeScript issues without using `as`.
		return [
			processSize(frameSize[0]),
			processSize(frameSize[1]),
			processSize(frameSize[2]),
			processSize(frameSize[3]),
		];
	};
}

function getCurrentScreenFrame(): FrameSize {
	const s = screen;

	// Some browsers return screen resolution as strings, e.g. "1200", instead of a number, e.g. 1200.
	// I suspect it's done by certain plugins that randomize browser properties to prevent fingerprinting.
	//
	// Some browsers (IE, Edge ≤18) don't provide `screen.availLeft` and `screen.availTop`. The property values are
	// replaced with 0 in such cases to not lose the entropy from `screen.availWidth` and `screen.availHeight`.
	return [
		replaceNaN(toFloat(s.availTop), null),
		replaceNaN(
			toFloat(s.width) -
				toFloat(s.availWidth) -
				replaceNaN(toFloat(s.availLeft), 0),
			null
		),
		replaceNaN(
			toFloat(s.height) -
				toFloat(s.availHeight) -
				replaceNaN(toFloat(s.availTop), 0),
			null
		),
		replaceNaN(toFloat(s.availLeft), null),
	];
}

function isFrameSizeNull(frameSize: FrameSize) {
	for (let i = 0; i < 4; ++i) {
		if (frameSize[i]) {
			return false;
		}
	}
	return true;
}
