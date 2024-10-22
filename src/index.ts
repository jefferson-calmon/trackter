import { config } from './config';

import * as Identification from './resources/Identification';
import * as Geolocation from './resources/Geolocation';
import * as BotDetection from 'resources/BotDetection';

export * from 'types/geolocation';
export * from 'types/identify';
export * from 'types/bot';

config();

export const trackter = {
	identify: Identification.identify,
	geolocation: Geolocation.geolocation,
	botDetection: BotDetection.detect,
};

export default trackter;
