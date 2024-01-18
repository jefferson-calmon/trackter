import { config } from './config';
import { IdentifyOptions } from 'types/identify';
import { BotDetectOptions } from 'types/bot';

import Identify from './resources/Identify';
import Geolocation from './resources/Geolocation';
import BotDetector from 'resources/BotDetector';

config();

export class Identifyzer {
	async identify(options?: IdentifyOptions) {
		return await new Identify().identify(options);
	}

	async geolocation() {
		return await new Geolocation().geolocation();
	}

	async botDetection(options?: BotDetectOptions) {
		return await new BotDetector().detect(options);
	}
}

export default Identifyzer;
