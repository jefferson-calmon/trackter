import { BotdError, State } from '../../types/bot'

export default function getAppVersion(): string {
  const appVersion = navigator.appVersion
  if (appVersion == undefined) {
    throw new BotdError(State.Undefined, 'navigator.appVersion is undefined')
  }
  return appVersion
}
