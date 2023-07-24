import { IdentifyOptions } from 'types/identify';

export function hasLiedBrowserSource(options: IdentifyOptions) {
	let e;
	const t = navigator.userAgent.toLowerCase();
	const i = navigator.productSub;
	if (
		((e =
			t.indexOf('firefox') >= 0
				? 'Firefox'
				: t.indexOf('opera') >= 0 || t.indexOf('opr') >= 0
				? 'Opera'
				: t.indexOf('chrome') >= 0
				? 'Chrome'
				: t.indexOf('safari') >= 0
				? 'Safari'
				: t.indexOf('trident') >= 0
				? 'Internet Explorer'
				: 'Other'),
		('Chrome' === e || 'Safari' === e || 'Opera' === e) && '20030107' !== i)
	)
		return !0;
	const a = eval.toString().length;
	if (37 === a && 'Safari' !== e && 'Firefox' !== e && 'Other' !== e)
		return !0;
	if (39 === a && 'Internet Explorer' !== e && 'Other' !== e) return !0;
	if (33 === a && 'Chrome' !== e && 'Opera' !== e && 'Other' !== e) return !0;
	let r;
	try {
		throw 'a';
	} catch (n: any) {
		try {
			n.toSource(), (r = !0);
		} catch (o) {
			r = !1;
		}
	}
	return !(!r || 'Firefox' === e || 'Other' === e);
}
