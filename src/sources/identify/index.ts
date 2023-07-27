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
import { domBlockersSource } from './domBlockers';
import { architectureSource } from './architecture';
import { audioSource } from './audio';
import { fontPreferencesSource } from './fontPreferences';
import { screenFrameSource } from './screenFrame';
import { osCpuSource } from './osCpu';
import { deviceMemorySource } from './deviceMemory';
import { vendorSource } from './vendor';
import { vendorFlavorsSource } from './vendorFlavors';
import { cookiesSource } from './cookies';
import { hdrSource } from './hdr';
import { colorGamutSource } from './colorGamut';
import { invertedColorsSource } from './invertedColors';
import { forcedColorsSource } from './forcedColors';
import { monochromeSource } from './monochrome';
import { contrastSource } from './contrast';
import { reducedMotionSource } from './reducedMotion';
import { webglBasicsSource, webglExtensionsSource } from './webgl';

import { DataKey, IdentifyOptions } from 'types/identify';
import { mathSource } from './math';
import { pdfViewerEnabledSource } from './pdfViewerEnabled';
import { privateClickMeasurementSource } from './privateClickMeasurement';
import { applePaySource } from './applePay';

export const sources: Record<DataKey, (options: IdentifyOptions) => any> = {
	audio: audioSource,
	fonts: fontsSource,
	fontPreferences: fontPreferencesSource,
	domBlockers: domBlockersSource,

	adBlock: adBlockSource,
	addBehavior: addBehaviorSource,
	availableScreenResolution: availableScreenResolutionSource,
	canvas: canvasSource,
	colorDepth: colorDepthSource,
	cpuClass: cpuClassSource,
	doNotTrack: doNotTrackSource,
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
	architecture: architectureSource,
	screenFrame: screenFrameSource,
	osCpu: osCpuSource,
	deviceMemory: deviceMemorySource,
	vendor: vendorSource,
	vendorFlavors: vendorFlavorsSource,
	languages: languageSource,
	cookies: cookiesSource,
	hdr: hdrSource,
	colorGamut: colorGamutSource,
	invertedColors: invertedColorsSource,
	forcedColors: forcedColorsSource,
	monochrome: monochromeSource,
	contrast: contrastSource,
	reducedMotion: reducedMotionSource,
	math: mathSource,
	webglBasis: webglBasicsSource,
	webglExtensions: webglExtensionsSource,
	pdfViewerEnabled: pdfViewerEnabledSource,
	privateClickMeasurement: privateClickMeasurementSource,
	applePay: applePaySource,
};
