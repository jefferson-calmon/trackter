import { BotType, ComponentDict, DetectorResponse, State } from '../../types/bot'

export function detectDistinctiveProperties({ distinctiveProps }: ComponentDict): DetectorResponse {
  if (distinctiveProps.state !== State.Success) return false
  const value = distinctiveProps.value
  let bot: BotType
  for (bot in value) if (value[bot]) return bot
}
