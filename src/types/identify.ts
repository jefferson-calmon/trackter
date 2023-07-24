export interface IdentifyOptions {
	exclude?: DataKey[];
}

export interface IdentifyResult {
	hash: string;
	identifier: string | null;
	confidence: number;
	data: Record<DataKey, DataValue>;
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
	| 'webgl';
