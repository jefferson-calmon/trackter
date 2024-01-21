import * as T from '../types/geolocation';

export async function geolocation() {
	try {
		const ipResponse = await fetch('https://api.myip.com/');
		const { ip }: T.MyIpResponse = await ipResponse.json();

		const geoResponse = await fetch(`https://ipapi.co/${ip}/json`);
		const data: T.IpApiResponse = await geoResponse.json();

		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}
