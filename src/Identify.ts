import * as C from './constants/identify';
import * as T from './types/identify';
import * as U from './utils/identify';
import * as Browser from './utils/browser';
import { hashing } from './utils/hashing';
import { arrayToObject } from 'utils/data';

export class Identify {
	private options = C.defaultOptions;

	async identify(options?: T.IdentifyOptions) {
		this.options = Object.assign(options || {}, C.defaultOptions);

		const dataList = await Promise.all([
			this.userAgentKey(),
			this.languageKey(),
			this.colorDepthKey(),
			this.pixelRatioKey(),
			this.hardwareConcurrencyKey(),
			this.screenResolutionKey(),
			this.availableScreenResolutionKey(),
			this.timezoneOffsetKey(),
			this.sessionStorageKey(),
			this.localStorageKey(),
			this.indexedDbKey(),
			this.addBehaviorKey(),
			this.openDatabaseKey(),
			this.cpuClassKey(),
			this.platformKey(),
			this.doNotTrackKey(),
			this.pluginsKey(),
			this.canvasKey(),
			this.webglKey(),
			this.adBlockKey(),
			this.hasLiedLanguagesKey(),
			this.hasLiedResolutionKey(),
			this.hasLiedOsKey(),
			this.hasLiedBrowserKey(),
			this.touchSupportKey(),
			this.customEntropyFunction(),
			await this.fontsKey(),
		]).then((data) => data as T.Data[]);

		const data = arrayToObject<T.IdentifyData>(dataList);
		const dataString = U.stringifyData(dataList);
		const confidence = this.confidence(String(data.navigator_platform));
		const hash = hashing.x64hash128(dataString, 31);
		const identifier = await hashing.x64mini128(dataString);

		const result: T.IdentifyResult = {
			hash,
			identifier,
			confidence,
			data,
			toString: () => dataString,
		};

		return result;
	}

	private confidence(platform: string) {
		if (Browser.isAndroid()) return 0.4;
		if (Browser.isWebKit()) return Browser.isDesktopSafari() ? 0.5 : 0.3;

		if (/^Win/.test(platform)) return 0.6;
		if (/^Mac/.test(platform)) return 0.5;

		return 0.7;
	}

	private empty(key: T.DataKey) {
		return {
			key,
			value: '',
		};
	}

	private customEntropyFunction() {
		if ('function' != typeof this.options.customFunction)
			return this.empty('custom');

		return {
			key: 'custom',
			value: this.options.customFunction(),
		};
	}

	private userAgentKey(): T.Data {
		if (this.options.excludeUserAgent) return this.empty('user_agent');

		return {
			key: 'user_agent',
			value: navigator.userAgent,
		};
	}

	private languageKey(): T.Data {
		if (this.options.excludeLanguage) return this.empty('language');

		return {
			key: 'language',
			value:
				navigator.language ||
				navigator.userLanguage ||
				navigator.browserLanguage ||
				navigator.systemLanguage ||
				'',
		};
	}

	private colorDepthKey(): T.Data {
		if (this.options.excludeColorDepth) return this.empty('color_depth');

		return {
			key: 'color_depth',
			value: screen.colorDepth || -1,
		};
	}

	private pixelRatioKey(): T.Data {
		if (this.options.excludePixelRatio) return this.empty('pixel_ratio');

		return {
			key: 'pixel_ratio',
			value: window.devicePixelRatio || '',
		};
	}

	private screenResolutionKey(): T.Data {
		if (this.options.excludeScreenResolution)
			return this.empty('resolution');

		let resolution;

		if (
			this.options.detectScreenOrientation &&
			screen.height > screen.width
		) {
			resolution = [screen.height, screen.width];
		} else {
			resolution = [screen.width, screen.height];
		}

		if (typeof resolution !== 'undefined') {
			return {
				key: 'resolution',
				value: resolution,
			};
		}

		return this.empty('resolution');
	}

	private availableScreenResolutionKey(): T.Data {
		if (this.options.excludeAvailableScreenResolution)
			return this.empty('available_resolution');

		let availableResolution;

		if (screen.availWidth && screen.availHeight) {
			if (this.options.detectScreenOrientation) {
				availableResolution =
					screen.availHeight > screen.availWidth
						? [screen.availHeight, screen.availWidth]
						: [screen.availWidth, screen.availHeight];
			} else {
				availableResolution = [screen.availHeight, screen.availWidth];
			}
		}

		if (typeof availableResolution !== 'undefined') {
			return {
				key: 'available_resolution',
				value: availableResolution,
			};
		}

		return this.empty('available_resolution');
	}

	private timezoneOffsetKey(): T.Data {
		if (this.options.excludeTimezoneOffset)
			return this.empty('timezone_offset');

		return {
			key: 'timezone_offset',
			value: new Date().getTimezoneOffset(),
		};
	}

	private sessionStorageKey(): T.Data {
		if (this.options.excludeSessionStorage)
			return this.empty('session_storage');
		if (!this.hasSessionStorage()) return this.empty('session_storage');

		return {
			key: 'session_storage',
			value: 1,
		};
	}

	private localStorageKey(): T.Data {
		if (this.options.excludeSessionStorage)
			return this.empty('local_storage');
		if (!this.hasLocalStorage()) return this.empty('local_storage');

		return {
			key: 'local_storage',
			value: 1,
		};
	}

	private indexedDbKey(): T.Data {
		if (this.options.excludeIndexedDB) return this.empty('indexed_db');
		if (!this.hasIndexedDB()) return this.empty('indexed_db');

		return {
			key: 'indexed_db',
			value: 1,
		};
	}

	private addBehaviorKey(): T.Data {
		if (this.options.excludeAddBehavior) return this.empty('add_behavior');
		if (!document.body || !document.body.addBehavior)
			return this.empty('add_behavior');

		return {
			key: 'add_behavior',
			value: 1,
		};
	}

	private openDatabaseKey(): T.Data {
		if (this.options.excludeOpenDatabase)
			return this.empty('open_database');
		if (!window.openDatabase) return this.empty('open_database');

		return {
			key: 'open_database',
			value: 1,
		};
	}

	private cpuClassKey(): T.Data {
		if (this.options.excludeCpuClass) return this.empty('cpu_class');

		return {
			key: 'cpu_class',
			value: navigator.cpuClass ? navigator.cpuClass : 'unknown',
		};
	}

	private platformKey(): T.Data {
		if (this.options.excludePlatform)
			return this.empty('navigator_platform');

		return {
			key: 'navigator_platform',
			value: navigator.platform ? navigator.platform : 'unknown',
		};
	}

	private doNotTrackKey(): T.Data {
		if (this.options.excludeDoNotTrack) return this.empty('do_not_track');

		const doNotTrack = navigator.doNotTrack
			? navigator.doNotTrack
			: navigator.msDoNotTrack
			? navigator.msDoNotTrack
			: window.doNotTrack
			? window.doNotTrack
			: 'unknown';

		return {
			key: 'do_not_track',
			value: doNotTrack,
		};
	}

	private canvasKey(): T.Data {
		if (this.options.excludeCanvas) return this.empty('canvas');
		if (!this.isCanvasSupported()) return this.empty('canvas');

		const canvasFpParts = [];

		// Create a temporary canvas element
		const canvas = document.createElement('canvas');
		canvas.width = 2000;
		canvas.height = 200;
		canvas.style.display = 'inline';

		const context = canvas.getContext('2d');
		if (!context) return this.empty('canvas');

		// Draw rectangles on the canvas
		context.rect(0, 0, 10, 10);
		context.rect(2, 2, 6, 6);

		// Check if the canvas winding is 'evenodd'
		canvasFpParts.push(
			'canvas winding:' +
				(context.isPointInPath(5, 5, 'evenodd') === false
					? 'yes'
					: 'no')
		);

		// Draw text on the canvas
		context.textBaseline = 'alphabetic';
		context.fillStyle = '#f60';
		context.fillRect(125, 1, 62, 20);
		context.fillStyle = '#069';
		this.options.dontUseFakeFontInCanvas
			? (context.font = '11pt Arial')
			: (context.font = '11pt no-real-font-123');
		context.fillText('Cwm fjordbank glyphs vext quiz, \ud83d\ude03', 2, 15);
		context.fillStyle = 'rgba(102, 204, 0, 0.2)';
		context.font = '18pt Arial';
		context.fillText('Cwm fjordbank glyphs vext quiz, \ud83d\ude03', 4, 45);

		// Draw circles on the canvas
		context.globalCompositeOperation = 'multiply';
		context.fillStyle = 'rgb(255,0,255)';
		context.beginPath();
		context.arc(50, 50, 50, 0, 2 * Math.PI, true);
		context.closePath();
		context.fill();

		context.fillStyle = 'rgb(0,255,255)';
		context.beginPath();
		context.arc(100, 50, 50, 0, 2 * Math.PI, true);
		context.closePath();
		context.fill();

		context.fillStyle = 'rgb(255,255,0)';
		context.beginPath();
		context.arc(75, 100, 50, 0, 2 * Math.PI, true);
		context.closePath();
		context.fill();

		context.fillStyle = 'rgb(255,0,255)';
		context.arc(75, 75, 75, 0, 2 * Math.PI, true);
		context.arc(75, 75, 25, 0, 2 * Math.PI, true);
		context.fill('evenodd');

		// Push the canvas fingerprint data (toDataURL) to the array
		canvasFpParts.push('canvas fp:' + canvas.toDataURL());

		return {
			key: 'canvas',
			value: canvasFpParts.join('~'),
		};
	}

	private webglKey(): T.Data {
		if (this.options.excludeWebGL) return this.empty('webgl');
		if (!this.isWebGlSupported()) return this.empty('webgl');

		return {
			key: 'webgl',
			value: this.getWebglFp(),
		};
	}

	private adBlockKey(): T.Data {
		if (this.options.excludeAdBlock) return this.empty('adblock');

		return {
			key: 'adblock',
			value: this.getAdBlock(),
		};
	}

	private hasLiedLanguagesKey(): T.Data {
		if (this.options.excludeHasLiedLanguages)
			return this.empty('has_lied_languages');

		return {
			key: 'has_lied_languages',
			value: this.getHasLiedLanguages(),
		};
	}

	private hasLiedResolutionKey(): T.Data {
		if (this.options.excludeHasLiedResolution)
			return this.empty('has_lied_resolution');

		return {
			key: 'has_lied_resolution',
			value: this.getHasLiedResolution(),
		};
	}

	private hasLiedOsKey(): T.Data {
		if (this.options.excludeHasLiedOs) return this.empty('has_lied_os');

		return {
			key: 'has_lied_os',
			value: this.getHasLiedOs(),
		};
	}

	private hasLiedBrowserKey(): T.Data {
		if (this.options.excludeHasLiedBrowser)
			return this.empty('has_lied_browser');

		return {
			key: 'has_lied_browser',
			value: this.getHasLiedBrowser(),
		};
	}

	private async fontsKey(): Promise<T.Data> {
		if (this.options.excludeJsFonts) return this.empty('js_fonts');

		return this.options.excludeJsFonts
			? await this.flashFontsKey()
			: await this.jsFontsKey();
	}

	private async flashFontsKey(): Promise<T.Data> {
		if (this.options.excludeFlashFonts) return this.empty('swf_fonts');
		if (!this.hasSwfObjectLoaded() || !this.hasMinFlashInstalled())
			return this.empty('swf_fonts');
		if ('undefined' == typeof this.options.swfPath)
			return this.empty('swf_fonts');

		const fonts = await new Promise<string[]>((resolve) => {
			this.loadSwfAndDetectFonts((fonts) => resolve(fonts));
		});

		return {
			key: 'swf_fonts',
			value: fonts.join(';'),
		} as T.Data;
	}

	private async jsFontsKey(): Promise<T.Data> {
		return await new Promise<T.Data>((resolve) => {
			setTimeout(() => {
				const allFonts = this.options.extendedJsFonts
					? [
							...C.standardFonts,
							...C.extendedFonts,
							...(this.options.userDefinedFonts || []),
					  ]
					: [...C.standardFonts];

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
					span.style.fontFamily = `'${fontFamily}',${C.standardFonts.join(
						','
					)}`;
					return span;
				};

				const createDummyFonts = () => {
					const fonts = [];
					for (const fontFamily of C.standardFonts) {
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
						for (const {} of C.standardFonts) {
							const span = getWidthHeight(fontName);
							div2.appendChild(span);
							variations.push(span);
						}
						(fontDetails as any)[fontName] = variations;
					}
					return fontDetails;
				};

				const hasFontsChanged = (fonts: any) => {
					for (let i = 0; i < C.standardFonts.length; i++) {
						if (
							fonts[i].offsetWidth !==
								fontWidths[C.standardFonts[i]] ||
							fonts[i].offsetHeight !==
								fontHeights[C.standardFonts[i]]
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
				for (let i = 0; i < C.standardFonts.length; i++) {
					fontWidths[C.standardFonts[i]] = dummyFonts[i].offsetWidth;
					fontHeights[C.standardFonts[i]] =
						dummyFonts[i].offsetHeight;
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

				const result: T.Data = {
					key: 'js_fonts',
					value: changedFonts,
				};

				resolve(result);
			}, 1);
		});
	}

	private pluginsKey(): T.Data {
		if (this.options.excludePlugins) return this.empty('regular_plugins');

		if (Browser.isIE()) {
			if (this.options.excludeIEPlugins) return this.empty('ie_plugins');

			return {
				key: 'ie_plugins',
				value: this.getIEPlugins(),
			};
		}

		return {
			key: 'regular_plugins',
			value: this.getRegularPlugins(),
		};
	}

	private getRegularPlugins() {
		const plugins = Array.from(navigator.plugins);

		if (this.pluginsShouldBeSorted()) {
			plugins.sort((a, b) => a.name.localeCompare(b.name));
		}

		return plugins.map((plugin) => {
			const mimeTypes = Array.from(
				plugin,
				(mime) => `${mime.type}~${mime.suffixes}`
			).join(',');
			return `${plugin.name}::${plugin.description}::${mimeTypes}`;
		});
	}

	private getIEPlugins() {
		const plugins = [];

		if ((window as any).ActiveXObject || 'ActiveXObject' in window) {
			const activeXObjects = [
				'AcroPDF.PDF',
				'Adodb.Stream',
				'AgControl.AgControl',
				'DevalVRXCtrl.DevalVRXCtrl.1',
				'MacromediaFlashPaper.MacromediaFlashPaper',
				'Msxml2.DOMDocument',
				'Msxml2.XMLHTTP',
				'PDF.PdfCtrl',
				'QuickTime.QuickTime',
				'QuickTimeCheckObject.QuickTimeCheck.1',
				'RealPlayer',
				'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)',
				'RealVideo.RealVideo(tm) ActiveX Control (32-bit)',
				'Scripting.Dictionary',
				'SWCtl.SWCtl',
				'Shell.UIHelper',
				'ShockwaveFlash.ShockwaveFlash',
				'Skype.Detection',
				'TDCCtl.TDCCtl',
				'WMPlayer.OCX',
				'rmocx.RealPlayer G2 Control',
				'rmocx.RealPlayer G2 Control.1',
			];

			for (const obj of activeXObjects) {
				try {
					new (window as any).ActiveXObject(obj);
					plugins.push(obj);
				} catch (error) {
					// Do nothing and continue to the next object
				}
			}
		}

		if (navigator.plugins) {
			return plugins.concat(this.getRegularPlugins());
		}

		return plugins;
	}

	private pluginsShouldBeSorted() {
		const pluginsToSortFor = this.options.sortPluginsFor;
		return (pluginsToSortFor || []).some((userAgent) =>
			navigator.userAgent.match(userAgent)
		);
	}

	private touchSupportKey(): T.Data {
		if (this.options.excludeTouchSupport)
			return this.empty('touch_support');

		return {
			key: 'touch_support',
			value: this.getTouchSupport(),
		};
	}

	private hardwareConcurrencyKey(): T.Data {
		if (this.options.excludeHardwareConcurrency)
			return this.empty('hardware_concurrency');

		return {
			key: 'hardware_concurrency',
			value: this.getHardwareConcurrency(),
		};
	}

	private hasSessionStorage() {
		try {
			return !!window.sessionStorage;
		} catch (e) {
			return !0;
		}
	}

	private hasLocalStorage() {
		try {
			return !!window.localStorage;
		} catch (e) {
			return !0;
		}
	}

	private hasIndexedDB() {
		try {
			return !!window.indexedDB;
		} catch (e) {
			return !0;
		}
	}

	private getHardwareConcurrency() {
		return navigator.hardwareConcurrency
			? navigator.hardwareConcurrency
			: 'unknown';
	}

	private getTouchSupport() {
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

	private getWebglFp() {
		const { context, canvas } = this.getWebglCanvas();
		if (!context) return '';

		function getInfo(param: number) {
			return context?.getParameter(param);
		}

		const extensions = context?.getSupportedExtensions()?.join(';');
		const maxTextureMaxAnisotropy = (() => {
			const ext =
				context?.getExtension('EXT_texture_filter_anisotropic') ||
				context?.getExtension(
					'WEBKIT_EXT_texture_filter_anisotropic'
				) ||
				context?.getExtension('MOZ_EXT_texture_filter_anisotropic');
			if (ext) {
				const maxAnisotropy = context?.getParameter(
					ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT
				);
				return maxAnisotropy === 0 ? 2 : maxAnisotropy;
			}
			return '';
		})();

		return [
			canvas.toDataURL(),
			`extensions:${extensions}`,
			`webgl aliased line width range:${getInfo(
				context?.ALIASED_LINE_WIDTH_RANGE
			)}`,
			`webgl aliased point size range:${getInfo(
				context?.ALIASED_POINT_SIZE_RANGE
			)}`,
			`webgl alpha bits:${getInfo(context?.ALPHA_BITS)}`,
			`webgl antialiasing:${
				context?.getContextAttributes()?.antialias ? 'yes' : 'no'
			}`,
			`webgl blue bits:${getInfo(context?.BLUE_BITS)}`,
			`webgl depth bits:${getInfo(context?.DEPTH_BITS)}`,
			`webgl green bits:${getInfo(context?.GREEN_BITS)}`,
			`webgl max anisotropy:${maxTextureMaxAnisotropy}`,
			`webgl max combined texture image units:${getInfo(
				context?.MAX_COMBINED_TEXTURE_IMAGE_UNITS
			)}`,
			`webgl max cube map texture size:${getInfo(
				context?.MAX_CUBE_MAP_TEXTURE_SIZE
			)}`,
			`webgl max fragment uniform vectors:${getInfo(
				context?.MAX_FRAGMENT_UNIFORM_VECTORS
			)}`,
			`webgl max render buffer size:${getInfo(
				context?.MAX_RENDERBUFFER_SIZE
			)}`,
			`webgl max texture image units:${getInfo(
				context?.MAX_TEXTURE_IMAGE_UNITS
			)}`,
			`webgl max texture size:${getInfo(context?.MAX_TEXTURE_SIZE)}`,
			`webgl max varying vectors:${getInfo(
				context?.MAX_VARYING_VECTORS
			)}`,
			`webgl max vertex attribs:${getInfo(context?.MAX_VERTEX_ATTRIBS)}`,
			`webgl max vertex texture image units:${getInfo(
				context?.MAX_VERTEX_TEXTURE_IMAGE_UNITS
			)}`,
			`webgl max vertex uniform vectors:${getInfo(
				context?.MAX_VERTEX_UNIFORM_VECTORS
			)}`,
			`webgl max viewport dims:${getInfo(context?.MAX_VIEWPORT_DIMS)}`,
			`webgl red bits:${getInfo(context?.RED_BITS)}`,
			`webgl renderer:${getInfo(context?.RENDERER)}`,
			`webgl shading language version:${getInfo(
				context?.SHADING_LANGUAGE_VERSION
			)}`,
			`webgl stencil bits:${getInfo(context?.STENCIL_BITS)}`,
			`webgl vendor:${getInfo(context?.VENDOR)}`,
			`webgl version:${getInfo(context?.VERSION)}`,
		].join('~');
	}

	private getAdBlock() {
		const testElement = document.createElement('div');
		testElement.innerHTML = '&nbsp;';
		testElement.className = 'adsbox';

		let adBlockDetected = false;

		try {
			document.body.appendChild(testElement);
			adBlockDetected = testElement.offsetHeight === 0;
			document.body.removeChild(testElement);
		} catch (error) {
			adBlockDetected = false;
		}

		return adBlockDetected;
	}

	private getHasLiedLanguages() {
		if ('undefined' != typeof navigator.languages)
			try {
				const e = navigator.languages[0].substr(0, 2);
				if (e !== navigator.language.substr(0, 2)) return !0;
			} catch (t) {
				return !0;
			}
		return !1;
	}

	private getHasLiedResolution() {
		return (
			screen.width < screen.availWidth ||
			screen.height < screen.availHeight
		);
	}

	private getHasLiedOs() {
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
				i.indexOf('win') >= 0 &&
					'Windows' !== e &&
					'Windows Phone' !== e)
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
			(a.indexOf('win') >= 0 &&
				'Windows' !== e &&
				'Windows Phone' !== e) ||
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

	private getHasLiedBrowser() {
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
			('Chrome' === e || 'Safari' === e || 'Opera' === e) &&
				'20030107' !== i)
		)
			return !0;
		const a = eval.toString().length;
		if (37 === a && 'Safari' !== e && 'Firefox' !== e && 'Other' !== e)
			return !0;
		if (39 === a && 'Internet Explorer' !== e && 'Other' !== e) return !0;
		if (33 === a && 'Chrome' !== e && 'Opera' !== e && 'Other' !== e)
			return !0;
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

	private isCanvasSupported() {
		const e = document.createElement('canvas');
		return !(!e.getContext || !e.getContext('2d'));
	}

	private isWebGlSupported() {
		if (!this.isCanvasSupported()) return !1;
		let e;
		const t = document.createElement('canvas');
		try {
			e =
				t.getContext &&
				(t.getContext('webgl') || t.getContext('experimental-webgl'));
		} catch (i) {
			e = !1;
		}
		return !!window.WebGLRenderingContext && !!e;
	}

	private hasSwfObjectLoaded() {
		return 'undefined' != typeof window.swfobject;
	}

	private hasMinFlashInstalled() {
		return window.swfobject.hasFlashPlayerVersion('9.0.0');
	}

	private addFlashDivNode() {
		const e = document.createElement('div');
		e.setAttribute('id', this.options.swfContainerId || '');
		document.body.appendChild(e);
	}

	private loadSwfAndDetectFonts(callback: (fonts: string[]) => void) {
		const swfLoadedCallback = '___identifyzer_swf_loaded';

		window[swfLoadedCallback] = function (fonts: string[]) {
			callback(fonts);
		};

		const swfContainerId = this.options.swfContainerId;
		this.addFlashDivNode();

		const swfOptions = {
			onReady: swfLoadedCallback,
		};

		const flashParams = {
			allowScriptAccess: 'always',
			menu: 'false',
		};

		const flashAttributes = {};

		window.swfobject.embedSWF(
			this.options.swfPath,
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

	private getWebglCanvas() {
		const canvas = document.createElement('canvas');

		try {
			const context =
				canvas.getContext('webgl') ||
				canvas.getContext('experimental-webgl');

			return {
				context: (context as WebGLRenderingContext) || null,
				canvas,
			};
		} catch (error) {
			return {
				context: null,
				canvas: null,
			};
		}
	}
}

export default Identify;
