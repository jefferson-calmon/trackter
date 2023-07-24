import { GeoLocationData } from '../types/geolocation';

export class Geolocation {
	async geolocation() {
		const response = await fetch('http://ip-api.com/json?fields=66846719');

		const data: GeoLocationData = await response.json();

		return data;
	}
}

export default Geolocation;
