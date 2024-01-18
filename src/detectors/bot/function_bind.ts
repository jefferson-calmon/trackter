import { BotType, ComponentDict, DetectorResponse, State } from '../../types/bot'

export function detectFunctionBind({ functionBind }: ComponentDict): DetectorResponse {
  if (functionBind.state === State.NotFunction) return BotType.PhantomJS
}
