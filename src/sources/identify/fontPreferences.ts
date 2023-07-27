import { IdentifyOptions } from 'types/identify';
import { isChromium, isWebKit } from '../../utils/browser';
import { withIframe } from '../../utils/dom';
import { MaybePromise } from '../../utils/async';

type WritableCSSProperties = {
	[K in keyof CSSStyleDeclaration]: CSSStyleDeclaration[K] extends string
		? K
		: never;
}[Extract<keyof CSSStyleDeclaration, string>];

type WritableCSSStyles = Partial<
	Pick<CSSStyleDeclaration, WritableCSSProperties>
>;

type Preset = [style?: WritableCSSStyles, text?: string];

const defaultText = 'mmMwWLliI0fiflO&1';

export const presets: Record<string, Preset> = {
	default: [],
	apple: [{ font: '-apple-system-body' }],
	serif: [{ fontFamily: 'serif' }],
	sans: [{ fontFamily: 'sans-serif' }],
	mono: [{ fontFamily: 'monospace' }],
	min: [{ fontSize: '1px' }],
	system: [{ fontFamily: 'system-ui' }],
};

export function fontPreferencesSource(options: IdentifyOptions) {
	return withNaturalFonts((document, container) => {
		const elements: Record<string, HTMLElement> = {};
		const sizes: Record<string, number> = {};

		for (const key of Object.keys(presets)) {
			const [style = {}, text = defaultText] = presets[key];

			const element = document.createElement('span');
			element.textContent = text;
			element.style.whiteSpace = 'nowrap';

			for (const name of Object.keys(style) as Array<
				keyof typeof style
			>) {
				const value = style[name];
				if (value !== undefined) {
					element.style[name] = value;
				}
			}

			elements[key] = element;
			container.appendChild(document.createElement('br'));
			container.appendChild(element);
		}

		for (const key of Object.keys(presets)) {
			sizes[key] = elements[key].getBoundingClientRect().width;
		}

		return sizes;
	});
}

function withNaturalFonts<T>(
	action: (document: Document, container: HTMLElement) => MaybePromise<T>,
	containerWidthPx = 4000
): Promise<T> {
	return withIframe((_, iframeWindow) => {
		const iframeDocument = iframeWindow.document;
		const iframeBody = iframeDocument.body;

		const bodyStyle = iframeBody.style;
		bodyStyle.width = `${containerWidthPx}px`;
		bodyStyle.webkitTextSizeAdjust = bodyStyle.textSizeAdjust = 'none';

		if (isChromium()) {
			iframeBody.style.zoom = `${1 / iframeWindow.devicePixelRatio}`;
		} else if (isWebKit()) {
			iframeBody.style.zoom = 'reset';
		}

		const linesOfText = iframeDocument.createElement('div');
		linesOfText.textContent = [...Array((containerWidthPx / 20) << 0)]
			.map(() => 'word')
			.join(' ');
		iframeBody.appendChild(linesOfText);

		return action(iframeDocument, iframeBody);
	}, '<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">');
}
