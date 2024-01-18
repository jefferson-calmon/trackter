import { BotType, ComponentDict, DetectorResponse, State } from '../../types/bot'

export function detectLanguagesLengthInconsistency({ languages }: ComponentDict): DetectorResponse {
  if (languages.state === State.Success && languages.value.length === 0) {
    return BotType.HeadlessChrome
  }
}
