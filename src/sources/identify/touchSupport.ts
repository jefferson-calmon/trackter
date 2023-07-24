import { IdentifyOptions } from 'types/identify';

export function touchSupportSource(options: IdentifyOptions) {
	let e = 0,
		t = !1;
	'undefined' != typeof navigator.maxTouchPoints
		? (e = navigator.maxTouchPoints)
		: 'undefined' != typeof navigator.msMaxTouchPoints &&
		  (e = navigator.msMaxTouchPoints);
	try {
		document.createEvent('TouchEvent'), (t = !0);
	} catch (i) {}
	const a = 'ontouchstart' in window;
	return [e, t, a];
}
