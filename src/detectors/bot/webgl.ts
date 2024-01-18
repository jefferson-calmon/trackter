import { BotType, ComponentDict, DetectorResponse, State } from '../../types/bot'

export function detectWebGL({ webGL }: ComponentDict): DetectorResponse {
  if (webGL.state === State.Success) {
    const { vendor, renderer } = webGL.value
    if (vendor == 'Brian Paul' && renderer == 'Mesa OffScreen') {
      return BotType.HeadlessChrome
    }
  }
}
