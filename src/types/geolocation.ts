export interface GeoLocationData {
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
