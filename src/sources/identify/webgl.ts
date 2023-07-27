import { IdentifyOptions } from 'types/identify';
import { isGecko } from '../../utils/browser';

type CanvasContext = WebGLRenderingContext & {
	readonly canvas: HTMLCanvasElement;
};

type Options = {
	cache: {
		webgl?: {
			context: CanvasContext | undefined;
		};
	};
};

/** WebGl context is not available */
export const STATUS_NO_GL_CONTEXT = -1;
/** WebGL context `getParameter` method is not a function */
export const STATUS_GET_PARAMETER_NOT_A_FUNCTION = -2;

export type SpecialStatus =
	| typeof STATUS_NO_GL_CONTEXT
	| typeof STATUS_GET_PARAMETER_NOT_A_FUNCTION;

const validContextParameters = new Set([
	10752, 2849, 2884, 2885, 2886, 2928, 2929, 2930, 2931, 2932, 2960, 2961,
	2962, 2963, 2964, 2965, 2966, 2967, 2968, 2978, 3024, 3042, 3088, 3089,
	3106, 3107, 32773, 32777, 32777, 32823, 32824, 32936, 32937, 32938, 32939,
	32968, 32969, 32970, 32971, 3317, 33170, 3333, 3379, 3386, 33901, 33902,
	34016, 34024, 34076, 3408, 3410, 3411, 3412, 3413, 3414, 3415, 34467, 34816,
	34817, 34818, 34819, 34877, 34921, 34930, 35660, 35661, 35724, 35738, 35739,
	36003, 36004, 36005, 36347, 36348, 36349, 37440, 37441, 37443, 7936, 7937,
	7938,
	// SAMPLE_ALPHA_TO_COVERAGE (32926) and SAMPLE_COVERAGE (32928) are excluded because they trigger a console warning
	// in IE, Chrome ≤ 59 and Safari ≤ 13 and give no entropy.
]);
const validExtensionParams = new Set([
	34047, // MAX_TEXTURE_MAX_ANISOTROPY_EXT
	35723, // FRAGMENT_SHADER_DERIVATIVE_HINT_OES
	36063, // MAX_COLOR_ATTACHMENTS_WEBGL
	34852, // MAX_DRAW_BUFFERS_WEBGL
	34853, // DRAW_BUFFER0_WEBGL
	34854, // DRAW_BUFFER1_WEBGL
	34229, // VERTEX_ARRAY_BINDING_OES
	36392, // TIMESTAMP_EXT
	36795, // GPU_DISJOINT_EXT
	38449, // MAX_VIEWS_OVR
]);
const shaderTypes = ['FRAGMENT_SHADER', 'VERTEX_SHADER'] as const;
const precisionTypes = [
	'LOW_FLOAT',
	'MEDIUM_FLOAT',
	'HIGH_FLOAT',
	'LOW_INT',
	'MEDIUM_INT',
	'HIGH_INT',
] as const;
const rendererInfoExtensionName = 'WEBGL_debug_renderer_info';

export function webglBasicsSource(options: IdentifyOptions) {
	const gl = getWebGLContext({});
	if (!gl) {
		return STATUS_NO_GL_CONTEXT;
	}

	if (!isValidParameterGetter(gl)) {
		return STATUS_GET_PARAMETER_NOT_A_FUNCTION;
	}

	const debugExtension = shouldAvoidDebugRendererInfo()
		? null
		: gl.getExtension(rendererInfoExtensionName);

	return {
		version: gl.getParameter(gl.VERSION)?.toString() || '',
		vendor: gl.getParameter(gl.VENDOR)?.toString() || '',
		vendorUnmasked: debugExtension
			? gl.getParameter(debugExtension.UNMASKED_VENDOR_WEBGL)?.toString()
			: '',
		renderer: gl.getParameter(gl.RENDERER)?.toString() || '',
		rendererUnmasked: debugExtension
			? gl
					.getParameter(debugExtension.UNMASKED_RENDERER_WEBGL)
					?.toString()
			: '',
		shadingLanguageVersion:
			gl.getParameter(gl.SHADING_LANGUAGE_VERSION)?.toString() || '',
	};
}

export function webglExtensionsSource(options: IdentifyOptions) {
	const gl = getWebGLContext({});
	if (!gl) {
		return STATUS_NO_GL_CONTEXT;
	}

	if (!isValidParameterGetter(gl)) {
		return STATUS_GET_PARAMETER_NOT_A_FUNCTION;
	}

	const extensions = gl.getSupportedExtensions();
	const contextAttributes = gl.getContextAttributes();

	// Features
	const attributes: string[] = [];
	const parameters: string[] = [];
	const extensionParameters: string[] = [];
	const shaderPrecisions: string[] = [];

	// Context attributes
	if (contextAttributes) {
		for (const attributeName of Object.keys(
			contextAttributes
		) as (keyof WebGLContextAttributes)[]) {
			attributes.push(
				`${attributeName}=${contextAttributes[attributeName]}`
			);
		}
	}

	// Context parameters
	const constants = getConstantsFromPrototype(gl);
	for (const constant of constants) {
		const code = gl[constant] as number;
		parameters.push(
			`${constant}=${code}${
				validContextParameters.has(code)
					? `=${gl.getParameter(code)}`
					: ''
			}`
		);
	}

	// Extension parameters
	if (extensions) {
		for (const name of extensions) {
			if (
				name === rendererInfoExtensionName &&
				shouldAvoidDebugRendererInfo()
			) {
				continue;
			}

			const extension = gl.getExtension(name);
			if (!extension) {
				continue;
			}

			for (const constant of getConstantsFromPrototype(extension)) {
				const code = extension[constant];
				extensionParameters.push(
					`${constant}=${code}${
						validExtensionParams.has(code)
							? `=${gl.getParameter(code)}`
							: ''
					}`
				);
			}
		}
	}

	// Shader precision
	for (const shaderType of shaderTypes) {
		for (const precisionType of precisionTypes) {
			const shaderPrecision = getShaderPrecision(
				gl,
				shaderType,
				precisionType
			);
			shaderPrecisions.push(
				`${shaderType}.${precisionType}=${shaderPrecision.join(',')}`
			);
		}
	}

	// Postprocess
	extensionParameters.sort();
	parameters.sort();

	return {
		contextAttributes: attributes,
		parameters: parameters,
		shaderPrecisions: shaderPrecisions,
		extensions: extensions,
		extensionParameters: extensionParameters,
	};
}

export function getWebGLContext(cache: Options['cache']) {
	if (cache.webgl) {
		return cache.webgl.context;
	}

	const canvas = document.createElement('canvas');
	let context: CanvasContext | undefined;

	canvas.addEventListener(
		'webglCreateContextError',
		() => (context = undefined)
	);

	for (const type of ['webgl', 'experimental-webgl']) {
		try {
			context = canvas.getContext(type) as CanvasContext;
		} catch {
			// Ok, continue
		}
		if (context) {
			break;
		}
	}

	cache.webgl = { context };
	return context;
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/WebGLShaderPrecisionFormat
 * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getShaderPrecisionFormat
 * https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.12
 */
function getShaderPrecision(
	gl: WebGLRenderingContext,
	shaderType: (typeof shaderTypes)[number],
	precisionType: (typeof precisionTypes)[number]
) {
	const shaderPrecision = gl.getShaderPrecisionFormat(
		gl[shaderType],
		gl[precisionType]
	);
	return shaderPrecision
		? [
				shaderPrecision.rangeMin,
				shaderPrecision.rangeMax,
				shaderPrecision.precision,
		  ]
		: [];
}

function getConstantsFromPrototype<K>(obj: K): Array<Extract<keyof K, string>> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const keys = Object.keys((obj as any).__proto__) as Array<keyof K>;
	return keys.filter(isConstantLike);
}

function isConstantLike<K>(key: K): key is Extract<K, string> {
	return typeof key === 'string' && !key.match(/[^A-Z0-9_x]/);
}

export function shouldAvoidDebugRendererInfo(): boolean {
	return isGecko();
}

function isValidParameterGetter(gl: WebGLRenderingContext) {
	return typeof gl.getParameter === 'function';
}
