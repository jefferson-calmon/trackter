import { BotType, ComponentDict, DetectorResponse, State } from '../../types/bot'

export function detectPluginsArray({ pluginsArray }: ComponentDict): DetectorResponse {
  if (pluginsArray.state === State.Success && !pluginsArray.value) return BotType.HeadlessChrome
}
