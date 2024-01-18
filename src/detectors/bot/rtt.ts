import { BotType, ComponentDict, DetectorResponse, State } from '../../types/bot'
import { isAndroid } from '../../utils/browser'

export function detectRTT({ rtt }: ComponentDict): DetectorResponse {
  if (rtt.state !== State.Success) return
  // Rtt is 0 on android webview
  if (isAndroid()) return
  if (rtt.value === 0) return BotType.HeadlessChrome
}
