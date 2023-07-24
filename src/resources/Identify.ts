import * as C from '../constants/identify';
import * as T from '../types/identify';
import * as U from '../utils/identify';
import * as S from 'sources/identify';
import * as Browser from '../utils/browser';
import { hashing } from '../utils/hashing';
import { arrayToObject } from 'utils/data';

export class Identify {
	private options = C.defaultOptions;

	async identify(options?: T.IdentifyOptions) {
		this.options = Object.assign(options || {}, C.defaultOptions);

		const exclude = this.options.exclude || [];

		const sources = Object.entries(S.sources).filter(
			([key]) => !exclude.find((k) => k === key)
		);

		const dataList = await Promise.all(
			sources.map(async ([key, value]) => ({
				key,
				value: await value(this.options),
			}))
		).then((dataList) => dataList as T.Data[]);

		const data = arrayToObject<T.IdentifyData>(dataList);
		const dataString = U.stringifyData(dataList);

		const confidence = this.confidence(String(data.platform));

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
}

export default Identify;
