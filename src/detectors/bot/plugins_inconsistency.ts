import { BotType, BrowserEngineType, ComponentDict, DetectorResponse, State } from '../../types/bot'
import { getBrowserEngineType, isAndroid, isDesktopSafari } from '../../utils/browser'

export function detectPluginsLengthInconsistency({ pluginsLength }: ComponentDict): DetectorResponse {
  if (pluginsLength.state !== State.Success) return
  const browserEngineKind = getBrowserEngineType()
  // Chromium based android browsers and mobile webkit based browsers have 0 plugins length.
  if (
    (browserEngineKind === BrowserEngineType.Chromium && isAndroid()) ||
    (browserEngineKind === BrowserEngineType.Webkit && !isDesktopSafari())
  )
    return
  if (pluginsLength.value === 0) return BotType.HeadlessChrome
}
