import { config } from './config';
import { IdentifyOptions } from 'types/identify';

import Identify from './resources/Identify';
import Geolocation from './resources/Geolocation';

config();

export class Identifyzer {
	async identify(options?: IdentifyOptions) {
		return await new Identify().identify(options);
	}

	async geolocation() {
		return await new Geolocation().geolocation();
	}
}

export default Identifyzer;
