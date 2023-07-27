import { IdentifyOptions } from 'types/identify';

export function pdfViewerEnabledSource(options: IdentifyOptions) {
	return navigator.pdfViewerEnabled;
}
