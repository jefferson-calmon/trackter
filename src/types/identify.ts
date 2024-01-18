import { BotDetectionResult } from "./bot";

export interface IdentifyOptions {
	exclude?: DataKey[];
	detectScreenOrientation?: boolean;
	extendedJsFonts?: boolean;
	userDefinedFonts?: string[];

	swfContainerId?: string;
	swfPath?: string;
}

export interface IdentifyResult {
	hash: string;
	id: string | null;
	confidence: number;
	data: Record<DataKey, DataValue>;
    bot: BotDetectionResult;
	toString: () => string;
}

export type IdentifyData = {
	[key in DataKey]: DataValue;
};

export interface Data {
	key: DataKey;
	value: DataValue;
}

export type DataValue =
	| string
	| number
	| boolean
	| string[]
	| number[]
	| boolean[]
	| (number | boolean)[];

export type DataKey =
	| 'adBlock'
	| 'addBehavior'
	| 'availableScreenResolution'
	| 'canvas'
	| 'colorDepth'
	| 'cpuClass'
	| 'doNotTrack'
	| 'fonts'
	| 'hardwareConcurrency'
	| 'hasLiedBrowser'
	| 'hasLiedLanguages'
	| 'hasLiedOs'
	| 'hasLiedResolution'
	| 'indexedDb'
	| 'language'
	| 'localStorage'
	| 'openDatabase'
	| 'pixelRatio'
	| 'platform'
	| 'plugins'
	| 'screenResolution'
	| 'sessionStorage'
	| 'timezoneOffset'
	| 'touchSupport'
	| 'userAgent'
	| 'domBlockers'
	| 'architecture'
	| 'audio'
	| 'fontPreferences'
	| 'screenFrame'
	| 'osCpu'
	| 'deviceMemory'
	| 'vendor'
	| 'vendorFlavors'
	| 'languages'
	| 'cookies'
	| 'hdr'
	| 'colorGamut'
	| 'invertedColors'
	| 'forcedColors'
	| 'monochrome'
	| 'contrast'
	| 'reducedMotion'
	| 'math'
	| 'webglExtensions'
	| 'webglBasis'
	| 'pdfViewerEnabled'
	| 'privateClickMeasurement'
	| 'applePay';
