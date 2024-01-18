import { extendedFonts, standardFonts } from 'constants/identify';
import { IdentifyOptions } from 'types/identify';

export async function fontsSource(options: IdentifyOptions) {
	return options.extendedJsFonts
		? await flashFontsKey(options)
		: await jsFontsKey(options);
}

async function flashFontsKey(options: IdentifyOptions) {
	if (!hasSwfObjectLoaded() || !hasMinFlashInstalled()) return '';

	const fonts = await new Promise<string[]>((resolve) => {
		loadSwfAndDetectFonts(options, (fonts) => resolve(fonts));
	});

	return fonts;
}

async function jsFontsKey(options: IdentifyOptions) {
	return await new Promise<string[]>((resolve) => {
		setTimeout(() => {
			const allFonts = options.extendedJsFonts
				? [
						...standardFonts,
						...extendedFonts,
						...(options.userDefinedFonts || []),
				  ]
				: [...standardFonts];

			const dummyText = 'mmmmmmmmmmlli';
			const fontSize = '72px';

			const body = document.getElementsByTagName('body')[0];
			const div1 = document.createElement('div');
			const div2 = document.createElement('div');

			const getWidthHeight = (fontFamily: string) => {
				const span = document.createElement('span');
				span.style.position = 'absolute';
				span.style.left = '-9999px';
				span.style.fontSize = fontSize;
				span.style.lineHeight = 'normal';
				span.innerHTML = dummyText;
				span.style.fontFamily = `'${fontFamily}',${standardFonts.join(
					','
				)}`;
				return span;
			};

			const createDummyFonts = () => {
				const fonts = [];
				for (const fontFamily of standardFonts) {
					const span = getWidthHeight(fontFamily);
					div1.appendChild(span);
					fonts.push(span);
				}
				return fonts;
			};

			const createExtendedFonts = () => {
				const fontDetails: Record<string, string[]> = {};
				for (const fontName of allFonts) {
					const variations = [];
					for (const {} of standardFonts) {
						const span = getWidthHeight(fontName);
						div2.appendChild(span);
						variations.push(span);
					}
					(fontDetails as any)[fontName] = variations;
				}
				return fontDetails;
			};

			const hasFontsChanged = (fonts: any) => {
				for (let i = 0; i < standardFonts.length; i++) {
					if (
						fonts[i].offsetWidth !== fontWidths[standardFonts[i]] ||
						fonts[i].offsetHeight !== fontHeights[standardFonts[i]]
					) {
						return true;
					}
				}
				return false;
			};

			const dummyFonts = createDummyFonts();
			body.appendChild(div1);

			const fontWidths: Record<string, number> = {};
			const fontHeights: Record<string, number> = {};
			for (let i = 0; i < standardFonts.length; i++) {
				fontWidths[standardFonts[i]] = dummyFonts[i].offsetWidth;
				fontHeights[standardFonts[i]] = dummyFonts[i].offsetHeight;
			}

			const extendedFontsData = createExtendedFonts();
			body.appendChild(div2);

			const changedFonts = [];
			for (const font of allFonts) {
				if (hasFontsChanged(extendedFontsData[font])) {
					changedFonts.push(font);
				}
			}

			body.removeChild(div2);
			body.removeChild(div1);

			resolve(changedFonts);
		}, 1);
	});
}

function hasSwfObjectLoaded() {
	return 'undefined' != typeof window.swfobject;
}

function hasMinFlashInstalled() {
	return window.swfobject.hasFlashPlayerVersion('9.0.0');
}

function loadSwfAndDetectFonts(
	options: IdentifyOptions,
	callback: (fonts: string[]) => void
) {
	const swfLoadedCallback = '___trackter_swf_loaded';

	window[swfLoadedCallback] = function (fonts: string[]) {
		callback(fonts);
	};

	const swfContainerId = options.swfContainerId;
	addFlashDivNode(options);

	const swfOptions = {
		onReady: swfLoadedCallback,
	};

	const flashParams = {
		allowScriptAccess: 'always',
		menu: 'false',
	};

	const flashAttributes = {};

	window.swfobject.embedSWF(
		options.swfPath,
		swfContainerId,
		'1',
		'1',
		'9.0.0',
		false,
		swfOptions,
		flashParams,
		flashAttributes
	);
}

function addFlashDivNode(options: IdentifyOptions) {
	const e = document.createElement('div');
	e.setAttribute('id', options.swfContainerId || '');
	document.body.appendChild(e);
}
