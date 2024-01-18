import { BotdError, State } from '../../types/bot'

export default function getProductSub(): string {
  const { productSub } = navigator
  if (productSub === undefined) {
    throw new BotdError(State.Undefined, 'navigator.productSub is undefined')
  }
  return productSub
}
