import * as C from '../constants/identify';
import * as T from '../types/identify';
import * as U from '../utils/identify';
import * as S from '../sources/identify';
import * as Browser from '../utils/browser';
import * as BotDetection from './BotDetection';
import { hashing } from '../utils/hashing';
import { arrayToObject } from 'utils/data';

export async function identify(identifyOptions?: T.IdentifyOptions) {
    const options = Object.assign(identifyOptions || {}, C.defaultOptions);

    const sources = U.processSources(S.sources, options);
    const components = await U.processComponents(sources, options);

    const data = arrayToObject<T.IdentifyData>(components);
    const dataString = U.stringifyData(components);

    const confidence = getConfidence(String(data.platform));
    const bot = await BotDetection.detect();

    const hash = hashing.x64hash128(dataString, 31);
    const id = await hashing.x64mini128(dataString);

    const result: T.IdentifyResult = {
        hash,
        id,
        confidence,
        data,
        bot,
        toString: () => dataString,
    };

    return result;
}

function getConfidence(platform: string) {
    if (Browser.isAndroid()) return 0.4;
    if (Browser.isWebKit()) return Browser.isDesktopSafari() ? 0.5 : 0.3;

    if (/^Win/.test(platform)) return 0.6;
    if (/^Mac/.test(platform)) return 0.5;

    return 0.7;
}

