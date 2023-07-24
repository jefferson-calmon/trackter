import { IdentifyOptions } from 'types/identify';
import { isCanvasSupported } from 'utils/identify';

export function webglSource(options: IdentifyOptions) {
	const { context, canvas } = getWebglCanvas();
	if (!context) return '';

	function getInfo(param: number) {
		return context?.getParameter(param);
	}

	const extensions = context?.getSupportedExtensions()?.join(';');
	const maxTextureMaxAnisotropy = (() => {
		const ext =
			context?.getExtension('EXT_texture_filter_anisotropic') ||
			context?.getExtension('WEBKIT_EXT_texture_filter_anisotropic') ||
			context?.getExtension('MOZ_EXT_texture_filter_anisotropic');
		if (ext) {
			const maxAnisotropy = context?.getParameter(
				ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT
			);
			return maxAnisotropy === 0 ? 2 : maxAnisotropy;
		}
		return '';
	})();

	return [
		canvas.toDataURL(),
		`extensions:${extensions}`,
		`webgl aliased line width range:${getInfo(
			context?.ALIASED_LINE_WIDTH_RANGE
		)}`,
		`webgl aliased point size range:${getInfo(
			context?.ALIASED_POINT_SIZE_RANGE
		)}`,
		`webgl alpha bits:${getInfo(context?.ALPHA_BITS)}`,
		`webgl antialiasing:${
			context?.getContextAttributes()?.antialias ? 'yes' : 'no'
		}`,
		`webgl blue bits:${getInfo(context?.BLUE_BITS)}`,
		`webgl depth bits:${getInfo(context?.DEPTH_BITS)}`,
		`webgl green bits:${getInfo(context?.GREEN_BITS)}`,
		`webgl max anisotropy:${maxTextureMaxAnisotropy}`,
		`webgl max combined texture image units:${getInfo(
			context?.MAX_COMBINED_TEXTURE_IMAGE_UNITS
		)}`,
		`webgl max cube map texture size:${getInfo(
			context?.MAX_CUBE_MAP_TEXTURE_SIZE
		)}`,
		`webgl max fragment uniform vectors:${getInfo(
			context?.MAX_FRAGMENT_UNIFORM_VECTORS
		)}`,
		`webgl max render buffer size:${getInfo(
			context?.MAX_RENDERBUFFER_SIZE
		)}`,
		`webgl max texture image units:${getInfo(
			context?.MAX_TEXTURE_IMAGE_UNITS
		)}`,
		`webgl max texture size:${getInfo(context?.MAX_TEXTURE_SIZE)}`,
		`webgl max varying vectors:${getInfo(context?.MAX_VARYING_VECTORS)}`,
		`webgl max vertex attribs:${getInfo(context?.MAX_VERTEX_ATTRIBS)}`,
		`webgl max vertex texture image units:${getInfo(
			context?.MAX_VERTEX_TEXTURE_IMAGE_UNITS
		)}`,
		`webgl max vertex uniform vectors:${getInfo(
			context?.MAX_VERTEX_UNIFORM_VECTORS
		)}`,
		`webgl max viewport dims:${getInfo(context?.MAX_VIEWPORT_DIMS)}`,
		`webgl red bits:${getInfo(context?.RED_BITS)}`,
		`webgl renderer:${getInfo(context?.RENDERER)}`,
		`webgl shading language version:${getInfo(
			context?.SHADING_LANGUAGE_VERSION
		)}`,
		`webgl stencil bits:${getInfo(context?.STENCIL_BITS)}`,
		`webgl vendor:${getInfo(context?.VENDOR)}`,
		`webgl version:${getInfo(context?.VERSION)}`,
	].join('~');
}

function getWebglCanvas() {
	const canvas = document.createElement('canvas');

	try {
		const context =
			canvas.getContext('webgl') ||
			canvas.getContext('experimental-webgl');

		return {
			context: (context as WebGLRenderingContext) || null,
			canvas,
		};
	} catch (error) {
		return {
			context: null,
			canvas: null,
		};
	}
}

function isWebGlSupported() {
	if (!isCanvasSupported()) return !1;

	let e;
	const t = document.createElement('canvas');
	try {
		e =
			t.getContext &&
			(t.getContext('webgl') || t.getContext('experimental-webgl'));
	} catch (i) {
		e = !1;
	}

	return !!window.WebGLRenderingContext && !!e;
}
