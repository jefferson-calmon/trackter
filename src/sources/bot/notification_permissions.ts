import { BotdError, State } from '../../types/bot'

export default async function getNotificationPermissions(): Promise<boolean> {
  if (window.Notification === undefined) {
    throw new BotdError(State.Undefined, 'window.Notification is undefined')
  }
  if (navigator.permissions === undefined) {
    throw new BotdError(State.Undefined, 'navigator.permissions is undefined')
  }
  const { permissions } = navigator
  if (typeof permissions.query !== 'function') {
    throw new BotdError(State.NotFunction, 'navigator.permissions.query is not a function')
  }
  try {
    const permissionStatus = await permissions.query({ name: 'notifications' })
    return window.Notification.permission === 'denied' && permissionStatus.state === 'prompt'
  } catch (e) {
    throw new BotdError(State.UnexpectedBehaviour, 'notificationPermissions signal unexpected behaviour')
  }
}
