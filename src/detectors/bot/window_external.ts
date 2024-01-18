import { BotType, ComponentDict, DetectorResponse, State } from '../../types/bot'

export function detectWindowExternal({ windowExternal }: ComponentDict): DetectorResponse {
  if (windowExternal.state !== State.Success) return false
  if (/Sequentum/i.test(windowExternal.value)) return BotType.Sequentum
}
