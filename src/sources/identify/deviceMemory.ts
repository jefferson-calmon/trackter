import { IdentifyOptions } from 'types/identify';
import { replaceNaN, toFloat } from 'utils/data';

export function deviceMemorySource(options: IdentifyOptions) {
	return replaceNaN(toFloat(navigator.deviceMemory), undefined);
}
