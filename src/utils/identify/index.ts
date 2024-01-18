import { sources } from 'sources/identify';
import { Data, DataKey, IdentifyOptions } from 'types/identify';

const customExcluded: DataKey[] = [
    'availableScreenResolution',
    'screenResolution',
    'screenFrame',
];

export function stringifyData(data: Data[]) {
    return data
        .compact()
        .filter((data) => !customExcluded.includes(data.key))
        .map((item: Data) => {
            const key = item.key;
            const value = JSON.stringify(item.value);

            return `${key}:${value}`;
        })
        .join('|');
}

export function isCanvasSupported() {
    const e = document.createElement('canvas');
    return !(!e.getContext || !e.getContext('2d'));
}

export function processSources(sources: Record<DataKey, (options: IdentifyOptions) => any>, options: IdentifyOptions) {
    const excludedSources = options.exclude || [];

    return Object.entries(sources).filter(
        ([key]) => !excludedSources.includes(key as DataKey)
    ) as [DataKey, (options: IdentifyOptions) => any][];
}

export async function processComponents(sources: [DataKey, (options: IdentifyOptions) => any][], options: IdentifyOptions): Promise<Data[]> {
    const components = await Promise.all(
        sources.map(async ([key, getter]) => {
            const result = await getter(options);
            const isFunction = typeof result === 'function';

            const value = isFunction ? await result() : result;

            return { key, value } as Data;
        })
    );

    return components;
}
