import { Data } from 'types/identify';

export function stringifyData(data: Data[]) {
	return data
		.compact()
		.map((item: Data) => {
			return typeof (item?.value as any).join !== 'undefined'
				? (item.value as string[]).join(';')
				: item?.value;
		})
		.join('~~~');
}
