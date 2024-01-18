import { BotType, ComponentDict, DetectorResponse, State } from '../../types/bot'

export function detectUserAgent({ userAgent }: ComponentDict): DetectorResponse {
  if (userAgent.state !== State.Success) return false
  if (/PhantomJS/i.test(userAgent.value)) return BotType.PhantomJS
  if (/Headless/i.test(userAgent.value)) return BotType.HeadlessChrome
  if (/Electron/i.test(userAgent.value)) return BotType.Electron
  if (/slimerjs/i.test(userAgent.value)) return BotType.SlimerJS
}
