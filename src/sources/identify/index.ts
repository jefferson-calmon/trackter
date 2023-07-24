import { adBlockSource } from './adBlock';
import { addBehaviorSource } from './addBehavior';
import { availableScreenResolutionSource } from './availableScreenResolution';
import { canvasSource } from './canvas';
import { colorDepthSource } from './colorDepth';
import { cpuClassSource } from './cpuClass';
import { doNotTrackSource } from './doNotTrack';
import { fontsSource } from './fonts';
import { hardwareConcurrencySource } from './hardwareConcurrency';
import { hasLiedBrowserSource } from './hasLiedBrowser';
import { hasLiedLanguagesSource } from './hasLiedLanguages';
import { hasLiedOsSource } from './hasLiedOs';
import { hasLiedResolutionSource } from './hasLiedResolution';
import { indexedDbSource } from './indexedDb';
import { languageSource } from './language';
import { localStorageSource } from './localStorage';
import { openDatabaseSource } from './openDatabase';
import { pixelRatioSource } from './pixelRatio';
import { platformSource } from './platform';
import { pluginsSource } from './plugins';
import { screenResolutionSource } from './screenResolution';
import { sessionStorageSource } from './sessionStorage';
import { timezoneOffsetSource } from './timezoneOffset';
import { touchSupportSource } from './touchSupport';
import { userAgentSource } from './userAgent';
import { webglSource } from './webgl';

export const sources = {
	adBlock: adBlockSource,
	addBehavior: addBehaviorSource,
	availableScreenResolution: availableScreenResolutionSource,
	canvas: canvasSource,
	colorDepth: colorDepthSource,
	cpuClass: cpuClassSource,
	doNotTrack: doNotTrackSource,
	fonts: fontsSource,
	hardwareConcurrency: hardwareConcurrencySource,
	hasLiedBrowser: hasLiedBrowserSource,
	hasLiedLanguages: hasLiedLanguagesSource,
	hasLiedOs: hasLiedOsSource,
	hasLiedResolution: hasLiedResolutionSource,
	indexedDb: indexedDbSource,
	language: languageSource,
	localStorage: localStorageSource,
	openDatabase: openDatabaseSource,
	pixelRatio: pixelRatioSource,
	platform: platformSource,
	plugins: pluginsSource,
	screenResolution: screenResolutionSource,
	sessionStorage: sessionStorageSource,
	timezoneOffset: timezoneOffsetSource,
	touchSupport: touchSupportSource,
	userAgent: userAgentSource,
	webgl: webglSource,
};
