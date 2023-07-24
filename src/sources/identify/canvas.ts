import { IdentifyOptions } from 'types/identify';
import { isCanvasSupported } from 'utils/identify';

export function canvasSource(options: IdentifyOptions) {
	if (!isCanvasSupported()) return '';

	const canvasFpParts = [];

	// Create a temporary canvas element
	const canvas = document.createElement('canvas');
	canvas.width = 2000;
	canvas.height = 200;
	canvas.style.display = 'inline';

	const context = canvas.getContext('2d');
	if (!context) return '';

	// Draw rectangles on the canvas
	context.rect(0, 0, 10, 10);
	context.rect(2, 2, 6, 6);

	// Check if the canvas winding is 'evenodd'
	canvasFpParts.push(
		'canvas winding:' +
			(context.isPointInPath(5, 5, 'evenodd') === false ? 'yes' : 'no')
	);

	// Draw text on the canvas
	context.textBaseline = 'alphabetic';
	context.fillStyle = '#f60';
	context.fillRect(125, 1, 62, 20);
	context.fillStyle = '#069';
	options.dontUseFakeFontInCanvas
		? (context.font = '11pt Arial')
		: (context.font = '11pt no-real-font-123');
	context.fillText('Cwm fjordbank glyphs vext quiz, \ud83d\ude03', 2, 15);
	context.fillStyle = 'rgba(102, 204, 0, 0.2)';
	context.font = '18pt Arial';
	context.fillText('Cwm fjordbank glyphs vext quiz, \ud83d\ude03', 4, 45);

	// Draw circles on the canvas
	context.globalCompositeOperation = 'multiply';
	context.fillStyle = 'rgb(255,0,255)';
	context.beginPath();
	context.arc(50, 50, 50, 0, 2 * Math.PI, true);
	context.closePath();
	context.fill();

	context.fillStyle = 'rgb(0,255,255)';
	context.beginPath();
	context.arc(100, 50, 50, 0, 2 * Math.PI, true);
	context.closePath();
	context.fill();

	context.fillStyle = 'rgb(255,255,0)';
	context.beginPath();
	context.arc(75, 100, 50, 0, 2 * Math.PI, true);
	context.closePath();
	context.fill();

	context.fillStyle = 'rgb(255,0,255)';
	context.arc(75, 75, 75, 0, 2 * Math.PI, true);
	context.arc(75, 75, 25, 0, 2 * Math.PI, true);
	context.fill('evenodd');

	// Push the canvas fingerprint data (toDataURL) to the array
	canvasFpParts.push('canvas fp:' + canvas.toDataURL());

	return canvasFpParts.join('~');
}
