import { calculateFrequency } from './calculate-frequency.js'
import { DurationContext, DurationContextParams } from "./duration-context.js"
import { memoized } from './memoized.js'
import { Voice, Music, Sound } from "./music.type.js"

interface CreateMusicParams extends DurationContextParams {}

interface VoicesGetter {
  (durationContext: DurationContext): Voice[]
}

export function createMusic(params: CreateMusicParams, getVoices: VoicesGetter): Music {
  const { ...durationContextParams } = params

  const durationContext = new DurationContext(durationContextParams)
  const voices = getVoices(durationContext)

  return voices
}

export const note = memoized((duration: number, semitonesFromBase: number): Sound => {
  return [calculateFrequency(semitonesFromBase), duration]
})

export function notes(duration: number, semitonesFromBase: number[]): Voice {
  return semitonesFromBase.map((distance) => note(duration, distance))
}

export const rest = memoized((duration: number): Sound => {
  return [NaN, duration]
})

/**
 * Alias for `NaN`, which represents frequency of a rest
 *
 * @example
 * ```ts
 * play([
 *   [
 *     ...notes(1 / 4, [r, r, -2, 3, 5, -2, 3, 5]),
 *     ...notes(1 / 4, [r, r, -2, 3, 5, -2, 3, 5]),
 *   ],
 *   [
 *     rest(1 / 4), note(7 / 4, -9),
 *     rest(1 / 4), note(7 / 4, -9),
 *   ],
 *   [
 *     note(2, -9),
 *     note(2, -9),
 *   ],
 * ])
 * ```
 */
export const r = NaN
