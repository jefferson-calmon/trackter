import * as D from '../detectors/bot';
import * as S from '../sources/bot';
import * as T from '../types/bot';
import { catchify } from 'utils/catchify';

export async function detect(options?: T.BotDetectOptions) {
    const components = await collect();
    const detectors = D.detectors;

    const detections = {} as T.DetectionDict;
    let finalDetection: T.BotDetectionResult = {
        isBot: false,
    };

    for (const detectorName in detectors) {
        const detector = detectors[detectorName as keyof typeof detectors];
        let detectorResult: T.DetectorResponse;

        detectorResult = catchify(() => detector(components), undefined);

        let detection: T.BotDetectionResult = { isBot: false };

        if (typeof detectorResult === 'string') {
            detection = { isBot: true, botType: detectorResult };
        } else if (detectorResult) {
            detection = { isBot: true, botType: T.BotType.Unknown };
        }

        detections[detectorName as keyof typeof detectors] = detection;

        if (detection.isBot) finalDetection = detection;
    }

    if (options?.returnComponents) finalDetection.components = components;
    if (options?.returnDetections) finalDetection.detections = detections;

    return finalDetection;
}

async function collect(): Promise<T.ComponentDict> {
    const sources = S.sources;
    const components = {} as T.ComponentDict;

    Promise.all(
        Object.entries(sources).map(async ([sourceKey, source]) => {
            const key = sourceKey as keyof typeof sources;

            try {
                components[key] = {
                    value: await source(),
                    state: T.State.Success,
                } as T.Component<any> as any;
            } catch (error) {
                if (error instanceof T.BotdError) {
                    components[key] = {
                        state: error.state,
                        error: `${error.name}: ${error.message}`,
                    };
                } else {
                    components[key] = {
                        state: T.State.UnexpectedBehaviour,
                        error:
                            error instanceof Error
                                ? `${error.name}: ${error.message}`
                                : String(error),
                    };
                }
            }
        })
    );

    return components;
}

