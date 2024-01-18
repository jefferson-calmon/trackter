import * as C from '../constants/identify';
import * as T from '../types/identify';
import * as U from '../utils/identify';
import * as S from 'sources/identify';
import * as Browser from '../utils/browser';
import { hashing } from '../utils/hashing';
import { arrayToObject } from 'utils/data';
import BotDetector from './BotDetector';

export class Identify {
	private options = C.defaultOptions;

	async identify(options?: T.IdentifyOptions) {
		this.options = Object.assign(options || {}, C.defaultOptions);

		const exclude = this.options.exclude || [];
		const sources = Object.entries(S.sources).filter(
			([key]) => !exclude.includes(key as T.DataKey)
		);

		const components = await Promise.all(
			sources.map(async ([key, getter]) => {
				const result = await getter(this.options);
				const isFunction = typeof result === 'function';

				const value = isFunction ? await result() : result;

				return { key, value } as T.Data;
			})
		);

		const data = arrayToObject<T.IdentifyData>(components);
		const dataString = U.stringifyData(components);

		const confidence = this.confidence(String(data.platform));
		const bot = await new BotDetector().detect();

		const hash = hashing.x64hash128(dataString, 31);
		const identifier = await hashing.x64mini128(dataString);

		const result: T.IdentifyResult = {
			hash,
			identifier,
			confidence,
			data,
			bot,
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
}

export default Identify;
