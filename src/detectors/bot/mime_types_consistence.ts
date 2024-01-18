import { BotType, ComponentDict, DetectorResponse, State } from '../../types/bot'

export function detectMimeTypesConsistent({ mimeTypesConsistent }: ComponentDict): DetectorResponse {
  if (mimeTypesConsistent.state === State.Success && !mimeTypesConsistent.value) {
    return BotType.Unknown
  }
}
