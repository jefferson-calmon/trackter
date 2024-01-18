import { BotType, ComponentDict, DetectorResponse, State } from '../../types/bot'
import { includes } from '../../utils/misc'

export function detectDocumentAttributes({ documentElementKeys }: ComponentDict): DetectorResponse {
  if (documentElementKeys.state !== State.Success) return false
  if (includes(documentElementKeys.value, 'selenium', 'webdriver', 'driver')) {
    return BotType.Selenium
  }
}
