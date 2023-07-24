export interface IdentifyOptions {
	customFunction?: () => void;
	excludeUserAgent?: boolean;
	excludeLanguage?: boolean;
	excludeColorDepth?: boolean;
	excludePixelRatio?: boolean;
	excludeScreenResolution?: boolean;
	detectScreenOrientation?: boolean;
	excludeAvailableScreenResolution?: boolean;
	excludeTimezoneOffset?: boolean;
	excludeSessionStorage?: boolean;
	excludeIndexedDB?: boolean;
	excludeAddBehavior?: boolean;
	excludeOpenDatabase?: boolean;
	excludeCpuClass?: boolean;
	excludePlatform?: boolean;
	excludeDoNotTrack?: boolean;
	excludeCanvas?: boolean;
	dontUseFakeFontInCanvas?: boolean;
	excludeWebGL?: boolean;
	excludeAdBlock?: boolean;
	excludeHasLiedLanguages?: boolean;
	excludeHasLiedResolution?: boolean;
	excludeHasLiedOs?: boolean;
	excludeHasLiedBrowser?: boolean;
	excludeJsFonts?: boolean;
	excludeFlashFonts?: boolean;
	extendedJsFonts?: boolean;
	userDefinedFonts?: string[];
	excludePlugins?: boolean;
	excludeIEPlugins?: boolean;
	sortPluginsFor?: RegExp[];
	excludeTouchSupport?: boolean;
	excludeHardwareConcurrency?: boolean;
	swfContainerId?: string;
	swfPath?: string;
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
	| 'custom'
	| 'user_agent'
	| 'language'
	| 'color_depth'
	| 'pixel_ratio'
	| 'resolution'
	| 'available_resolution'
	| 'timezone_offset'
	| 'session_storage'
	| 'local_storage'
	| 'indexed_db'
	| 'add_behavior'
	| 'open_database'
	| 'cpu_class'
	| 'navigator_platform'
	| 'do_not_track'
	| 'canvas'
	| 'webgl'
	| 'adblock'
	| 'has_lied_languages'
	| 'has_lied_resolution'
	| 'has_lied_os'
	| 'has_lied_browser'
	| 'swf_fonts'
	| 'js_fonts'
	| 'ie_plugins'
	| 'regular_plugins'
	| 'touch_support'
	| 'hardware_concurrency';
