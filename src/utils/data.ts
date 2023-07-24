export function countTruthy(values: unknown[]): number {
	return values.reduce<number>((sum, value) => sum + (value ? 1 : 0), 0);
}

export function arrayToObject<R extends object>(array: Array<any>): R {
	return array.reduce<R>((acc, { key, value }) => {
		return Object.assign(acc, { [key]: value });
	}, {} as R);
}
