import { IdentifyOptions } from 'types/identify';

export function privateClickMeasurementSource(options: IdentifyOptions) {
	const link = document.createElement('a');
	const sourceId = link.attributionSourceId ?? link.attributionsourceid;
	return sourceId === undefined ? undefined : String(sourceId);
}
