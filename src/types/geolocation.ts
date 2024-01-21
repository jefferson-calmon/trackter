export interface IpApiResponse {
	query: string; // IP address
	status: string; // Status of the geolocation request
	continent: string; // Contienent name
	continentCode: string; // Continent code
	country: string; // Country name
	countryCode: string; // Country code
	region: string; // Region code (e.g., state code for countries)
	regionName: string; // Region or state name
	city: string; // City name
	district: string; // District or area name
	zip: string; // ZIP or postal code
	lat: number; // Latitude
	lon: number; // Longitude
	timezone: string; // Timezone (e.g., "America/New_York")
	offset: number; // Timezone offset in seconds
	currency: string; // Currency code (e.g., "USD")
	isp: string; // Internet Service Provider
	org: string; // Organization name
	as: string; // Autonomous System Number (ASN)
	asname: string; // Autonomous System name
	mobile: boolean; // Whether it's a mobile network (true/false)
	proxy: boolean; // Whether it's a proxy (true/false)
	hosting: boolean; // Whether it's a hosting providr (true/false)
}

export interface MyIpResponse {
	ip: string;
	country: string;
	cc: string;
}

export interface IpApiResponse {
	ip: string;
	network: string;
	version: string;
	city: string;
	region: string;
	region_code: string;
	country: string;
	country_name: string;
	country_code: string;
	country_code_iso3: string;
	country_capital: string;
	country_tld: string;
	continent_code: string;
	in_eu: boolean;
	postal: string;
	latitude: number;
	longitude: number;
	timezone: string;
	utc_offset: string;
	country_calling_code: string;
	currency: string;
	currency_name: string;
	languages: string;
	country_area: number;
	country_population: number;
	asn: string;
	org: string;
}

// export type GeoLocationData =
