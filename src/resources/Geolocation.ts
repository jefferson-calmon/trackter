import * as T from '../types/geolocation';

export async function geolocation() {
	/**
	 * https://api.sefinek.net/api/v2/geoip/209.14.149.25
	 * http://ip-api.com/json?fields=66846719
	 */

	try {
		const ipResponse = await fetch('https://api.myip.com/', {
			mode: 'no-cors',
		});
		const { ip }: T.MyIpResponse = await ipResponse.json();

		const geoResponse = await fetch(`https://ipapi.co/${ip}/json`, {
			mode: 'no-cors',
		});
		const data: T.IpApiResponse = await geoResponse.json();

		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}
