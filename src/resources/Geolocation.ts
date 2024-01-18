import * as T from '../types/geolocation';

export async function geolocation() {
    const response = await fetch('http://ip-api.com/json?fields=66846719');

    const data: T.GeoLocationData = await response.json();

    return data;
}
