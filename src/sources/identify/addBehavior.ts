import { IdentifyOptions } from 'types/identify';

export function addBehaviorSource(options: IdentifyOptions) {
	if (!document.body || !document.body.addBehavior) return 0;

	return 1;
}
