/* Browser APIs not described by TypeScript */

interface Window {
	webkitOfflineAudioContext?: OfflineAudioContext;
	doNotTrack: string;
	openDatabase?(...args: unknown[]): void;
	swfobject: any;
	___identifyzer_swf_loaded: (fonts: string[]) => void;

	ApplePaySession?: ApplePaySessionConstructor;
}

interface ApplePaySessionConstructor {
	/** @see https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/creating_an_apple_pay_session */
	new (version: number, request: Record<never, never>): never;
	/** @see https://developer.apple.com/documentation/apple_pay_on_the_web/applepaysession/1778027-canmakepayments */
	canMakePayments(): boolean;
}

interface NetworkInformation extends EventTarget {
	readonly rtt: number;
}

interface NavigatorUAData {
	readonly brands?: Array<Record<string, string>>;
	readonly mobile: boolean;
}

interface HTMLAnchorElement {
	// See https://webkit.org/blog/11529/introducing-private-click-measurement-pcm/
	attributionSourceId?: number;
	/** Before Safari 15.4. The value is a string in Safari 14. */
	attributionsourceid?: number | string;
}

interface Navigator {
	readonly connection?: NetworkInformation;
	readonly userAgentData?: NavigatorUAData;
	oscpu?: string;
	userLanguage?: string;
	browserLanguage?: string;
	systemLanguage?: string;
	deviceMemory?: number;
	cpuClass?: string;
	msDoNotTrack: string;
	readonly msMaxTouchPoints?: number;
}

interface Document {
	msFullscreenElement?: typeof document.fullscreenElement;
	mozFullScreenElement?: typeof document.fullscreenElement;
	webkitFullscreenElement?: typeof document.fullscreenElement;

	msExitFullscreen?: typeof document.exitFullscreen;
	mozCancelFullScreen?: typeof document.exitFullscreen;
	webkitExitFullscreen?: typeof document.exitFullscreen;
}

interface Screen {
	availLeft?: number;
	availTop?: number;
}

interface Element {
	webkitRequestFullscreen?: typeof Element.prototype.requestFullscreen;
}

interface CSSStyleDeclaration {
	zoom: string;
	textSizeAdjust: string;
}

interface HTMLElement {
	addBehavior: () => void;
}
