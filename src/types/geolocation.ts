/**
 * https://api.sefinek.net/api/v2/geoip/209.14.149.25
 * http://ip-api.com/json?fields=66846719
 * http://db-ip.com/
 * http://api.db-ip.com/v2/{apiKey}/{ipAddress}
 * */

export type Service = 'ip-api.com' | 'ipapi.co' | 'db-ip.com';
export type ServiceResponse = Ip_Api_Com_Response &
	IpApi_Co_Response &
	DbIpResponse;
export type ServiceCallback = (ip: string, apiKey?: string) => string;

export interface GeolocationProps {
	service: Service;
	apiKey?: string;
	ip?: string;
}

export interface GeolocationData {
	ip: string;

	postal: string | null;
	city: string;
	region: string;
	regionCode: string;
	country: string;
	countryCode: string;
	continent: string;
	continentCode: string;

	latitude: number;
	longitude: number;

	timezone: string;
	currency: string;
	languages: string[];

	isp: string;
	organization: string;
}

export interface MyIpResponse {
	ip: string;
	country: string;
	cc: string;
}

export interface IpifyResponse {
	ip: string;
}

export interface Ip_Api_Com_Response {
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

export interface IpApi_Co_Response {
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

export interface DbIpResponse {
	ipAddress: string; // '209.14.148.196'
	continentCode: string; // 'SA'
	continentName: string; // 'South America'
	countryCode: string; // 'BR'
	countryName: string; // 'Brasil'
	isEuMember: boolean; // false
	currencyCode: string; // 'BRL'
	currencyName: string; // 'Real'
	phonePrefix: string; // '55'
	languages: string[]; // ['pt-BR', 'es', 'en', 'fr']
	stateProvCode: string; // 'BA'
	stateProv: string; // 'Bahia'
	district: string; // 'Porto Seguro'
	city: string; // 'Porto Seguro'
	geonameId: number; // 3452640
	latitude: number; // -16.4497
	longitude: number; // -39.0647
	gmtOffset: number; // -3
	timeZone: string; // 'America/Bahia'
	weatherCode: string; // 'BRXX0306'
	asNumber: number; // 268255
	asName: string; // 'AS268255'
	isp: string; // 'Fibranet Brasil'
	linkType: string; // 'dsl'
	usageType: string; // 'consumer'
	organization: string; // 'Infortel Telecom'
	isCrawler: boolean; // false
	isProxy: boolean; // false
	threatLevel: 'low' | 'medium' | 'high'; // 'low'
}
