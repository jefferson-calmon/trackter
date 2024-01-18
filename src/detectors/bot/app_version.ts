import { BotType, ComponentDict, DetectorResponse, State } from '../../types/bot'

export function detectAppVersion({ appVersion }: ComponentDict): DetectorResponse {
  if (appVersion.state !== State.Success) return false
  if (/headless/i.test(appVersion.value)) return BotType.HeadlessChrome
  if (/electron/i.test(appVersion.value)) return BotType.Electron
  if (/slimerjs/i.test(appVersion.value)) return BotType.SlimerJS
}
