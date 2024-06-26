import * as T from '../types/geolocation';

export const services: Record<T.Service, T.ServiceCallback> = {
	'ip-api.com': () => {
		return `http://ip-api.com/json?fields=66846719`;
	},

	'ipapi.co': (ip) => {
		return `https://ipapi.co/${ip}/json`;
	},

	'db-ip.com': (ip, apiKey = 'free') => {
		return `http://api.db-ip.com/v2/${apiKey}/${ip}`;
	},
};

export async function geolocation(props: T.GeolocationProps) {
	try {
		let ip: string = '';

		if (!props.ip) {
			await fetch('https://api.ipify.org/?format=json')
				.then((response) => response.json())
				.then((data) => (ip = data.ip));
		}

		const service = services[props.service];

		const serviceResponse = await fetch(service(ip, props.apiKey))
			.then((response) => response.json())
			.then((data) => data as T.ServiceResponse);

		const geolocation = createGeolocationData(serviceResponse);

		return geolocation;
	} catch (error) {
		console.error('Geolocation Error', error);
		return null;
	}
}

function createGeolocationData(data: Partial<T.ServiceResponse>) {
	const geolocation: T.GeolocationData = {
		ip: data?.ip ?? data?.ipAddress ?? data?.query ?? '',

		postal: data?.postal ?? data?.zip ?? null,
		city: data?.city ?? '',
		region: data.regionName ?? data?.region ?? '',
		regionCode: data?.region_code ?? data.region ?? '',
		country: data?.country ?? data.countryName ?? '',
		countryCode: data?.countryCode ?? data.country_code ?? '',
		continent: data?.continent ?? data.continentName ?? '',
		continentCode: data?.continentCode ?? data.continent_code ?? '',

		latitude: data.lat ?? data.latitude ?? -1,
		longitude: data.lon ?? data.longitude ?? -1,

		timezone: data.timeZone ?? data.timezone ?? '',
		currency: data.currency ?? data.currencyCode ?? '',
		languages: [data.languages]
			.flat()
			.compact()
			.flatMap((language) => language.split(',')),

		isp: data.isp ?? '',
		organization: data.org ?? data.organization ?? '',
	};

	return geolocation;
}
