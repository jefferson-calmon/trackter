import { arrayIncludes } from '../../utils/ponyfills'
import { BrowserEngineType, BrowserType, ComponentDict, DetectorResponse, State } from '../../types/bot'
import { getBrowserEngineType, getBrowserType } from '../../utils/browser'

export function detectEvalLengthInconsistency({ evalLength }: ComponentDict): DetectorResponse {
  if (evalLength.state !== State.Success) return
  const length = evalLength.value
  const browser = getBrowserType()
  const browserEngine = getBrowserEngineType()
  return (
    (length === 37 && !arrayIncludes([BrowserEngineType.Webkit, BrowserEngineType.Gecko], browserEngine)) ||
    (length === 39 && !arrayIncludes([BrowserType.IE], browser)) ||
    (length === 33 && !arrayIncludes([BrowserEngineType.Chromium], browserEngine))
  )
}
