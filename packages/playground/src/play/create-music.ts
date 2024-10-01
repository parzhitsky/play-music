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
 * Alias for `NaN`, which is both the distance from the base note to a pause, and the frequency of a pause
 *
 * @example
 * play([
 *   [
 *     ...notes(1 / 4, [_, _, -2, 3, 7, -2, 3, 7]),
 *   ],
 *   [
 *     rest(1 / 4), note(7 / 4, -9),
 *   ],
 *   [
 *     note(2, -9),
 *   ],
 * ])
 *
 * @example
 * const g = 391.9954359817492
 * const c = 523.2511306011972
 * const e = 659.2551138257401
 *
 * play([
 *   [
 *     [_, 1/2], [g, 1/4], [c, 1/4], [e, 1/4], [g, 1/4], [c, 1/4], [e, 1/4],
 *   ],
 *   [
 *     rest(1 / 4), note(7 / 4, -9),
 *   ],
 *   [
 *     note(2, -9),
 *   ],
 * ])
 */
export const r = NaN
