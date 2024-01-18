export function catchify<C extends () => void, V extends any>(
	callback: C,
	returnValueIfFail: V
): ReturnType<C> | V {
	try {
		return callback() as ReturnType<C>;
	} catch (error) {
		return returnValueIfFail;
	}
}
