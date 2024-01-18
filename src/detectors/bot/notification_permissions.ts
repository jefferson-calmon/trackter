import { BotType, BrowserType, ComponentDict, DetectorResponse, State } from '../../types/bot'
import { getBrowserType } from '../../utils/browser'

export function detectNotificationPermissions({ notificationPermissions }: ComponentDict): DetectorResponse {
  const browserKind = getBrowserType()
  if (browserKind !== BrowserType.Chrome) return false

  if (notificationPermissions.state === State.Success && notificationPermissions.value) {
    return BotType.HeadlessChrome
  }
}
