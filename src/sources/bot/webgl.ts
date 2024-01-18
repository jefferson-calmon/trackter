import { BotdError, State } from '../../types/bot'

export interface WebGLPayload {
  vendor: string
  renderer: string
}

export default function getWebGL(): WebGLPayload {
  const canvasElement = document.createElement('canvas')

  if (typeof canvasElement.getContext !== 'function') {
    throw new BotdError(State.NotFunction, 'HTMLCanvasElement.getContext is not a function')
  }

  const webGLContext = canvasElement.getContext('webgl')

  if (webGLContext === null) {
    throw new BotdError(State.Null, 'WebGLRenderingContext is null')
  }

  if (typeof webGLContext.getParameter !== 'function') {
    throw new BotdError(State.NotFunction, 'WebGLRenderingContext.getParameter is not a function')
  }

  const vendor = webGLContext.getParameter(webGLContext.VENDOR)
  const renderer = webGLContext.getParameter(webGLContext.RENDERER)

  return { vendor: vendor, renderer: renderer }
}
