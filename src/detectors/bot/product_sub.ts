import { BotType, BrowserType, ComponentDict, DetectorResponse, State } from '../../types/bot'
import { getBrowserType } from '../../utils/browser'

export function detectProductSub({ productSub }: ComponentDict): DetectorResponse {
  if (productSub.state !== State.Success) return false
  const browserKind = getBrowserType()
  if (
    (browserKind === BrowserType.Chrome ||
      browserKind === BrowserType.Safari ||
      browserKind === BrowserType.Opera ||
      browserKind === BrowserType.WeChat) &&
    productSub.value !== '20030107'
  )
    return BotType.Unknown
}
