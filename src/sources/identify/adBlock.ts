import { IdentifyOptions } from 'types/identify';
import { isCanvasSupported } from 'utils/identify';

export function adBlockSource(options: IdentifyOptions) {
	const testElement = document.createElement('div');
	testElement.innerHTML = '&nbsp;';
	testElement.className = 'adsbox';

	let adBlockDetected = false;

	try {
		document.body.appendChild(testElement);
		adBlockDetected = testElement.offsetHeight === 0;
		document.body.removeChild(testElement);
	} catch (error) {
		adBlockDetected = false;
	}

	return adBlockDetected;
}
