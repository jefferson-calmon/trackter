import { BotType, ComponentDict, DetectorResponse, State } from '../../types/bot'

export function detectErrorTrace({ errorTrace }: ComponentDict): DetectorResponse {
  if (errorTrace.state !== State.Success) return false
  if (/PhantomJS/i.test(errorTrace.value)) return BotType.PhantomJS
}
