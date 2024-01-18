import { BotType, ComponentDict, DetectorResponse, State } from '../../types/bot'

export function detectWebDriver({ webDriver }: ComponentDict): DetectorResponse {
  if (webDriver.state === State.Success && webDriver.value) return BotType.HeadlessChrome
}
