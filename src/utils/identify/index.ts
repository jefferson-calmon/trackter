import { Data, DataKey } from 'types/identify';

const customExcluded: DataKey[] = [
	'availableScreenResolution',
	'screenResolution',
	'screenFrame',
];

export function stringifyData(data: Data[]) {
	return data
		.compact()
		.filter((data) => !customExcluded.includes(data.key))
		.map((item: Data) => {
			const key = item.key;
			const value = JSON.stringify(item.value);

			return `${key}:${value}`;
		})
		.join('|');
}

export function isCanvasSupported() {
	const e = document.createElement('canvas');
	return !(!e.getContext || !e.getContext('2d'));
}
