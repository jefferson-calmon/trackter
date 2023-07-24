import { IdentifyOptions } from 'types/identify';

export function openDatabaseSource(options: IdentifyOptions) {
	return !!window.openDatabase;
}

