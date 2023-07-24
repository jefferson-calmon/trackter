import { IdentifyOptions } from 'types/identify';

export function hasLiedOsSource(options: IdentifyOptions) {
	const t = navigator.userAgent.toLowerCase();
	let i = navigator.oscpu;
	const a = navigator.platform.toLowerCase();

	const e =
		t.indexOf('windows phone') >= 0
			? 'Windows Phone'
			: t.indexOf('win') >= 0
			? 'Windows'
			: t.indexOf('android') >= 0
			? 'Android'
			: t.indexOf('linux') >= 0
			? 'Linux'
			: t.indexOf('iphone') >= 0 || t.indexOf('ipad') >= 0
			? 'iOS'
			: t.indexOf('mac') >= 0
			? 'Mac'
			: 'Other';
	let r;
	if (
		((r =
			'ontouchstart' in window ||
			navigator.maxTouchPoints > 0 ||
			(navigator.msMaxTouchPoints || 0) > 0),
		r &&
			'Windows Phone' !== e &&
			'Android' !== e &&
			'iOS' !== e &&
			'Other' !== e)
	)
		return !0;
	if ('undefined' != typeof i) {
		if (
			((i = i.toLowerCase()),
			i.indexOf('win') >= 0 && 'Windows' !== e && 'Windows Phone' !== e)
		)
			return !0;
		if (i.indexOf('linux') >= 0 && 'Linux' !== e && 'Android' !== e)
			return !0;
		if (i.indexOf('mac') >= 0 && 'Mac' !== e && 'iOS' !== e) return !0;
		if (
			0 === i.indexOf('win') &&
			0 === i.indexOf('linux') &&
			i.indexOf('mac') >= 0 &&
			'Other' !== e
		)
			return !0;
	}

	return (
		(a.indexOf('win') >= 0 && 'Windows' !== e && 'Windows Phone' !== e) ||
		((a.indexOf('linux') >= 0 ||
			a.indexOf('android') >= 0 ||
			a.indexOf('pike') >= 0) &&
			'Linux' !== e &&
			'Android' !== e) ||
		((a.indexOf('mac') >= 0 ||
			a.indexOf('ipad') >= 0 ||
			a.indexOf('ipod') >= 0 ||
			a.indexOf('iphone') >= 0) &&
			'Mac' !== e &&
			'iOS' !== e) ||
		(0 === a.indexOf('win') &&
			0 === a.indexOf('linux') &&
			a.indexOf('mac') >= 0 &&
			'Other' !== e) ||
		('undefined' == typeof navigator.plugins &&
			'Windows' !== e &&
			'Windows Phone' !== e)
	);
}
