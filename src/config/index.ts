declare global {
	interface Array<T> {
		/** Returns a copy of the array with all falsy values removed */
		compact: () => Exclude<T, null | undefined | false>[];
	}
}

export const config = () => {
	Array.prototype.compact = function () {
		return this.filter(Boolean);
	};
};
