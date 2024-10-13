import { calculateFrequency } from "./calculate-frequency.js"
import { Sound, VoiceLineItem, Pause, VoiceLine } from "./create-music.js"
import { memoized } from "./memoized.js"

export { Sound, Pause, VoiceLineItem, VoiceLine, VoiceLines, Music } from './create-music.js'

/**
 * Alias for `NaN`, which is both the distance from the base note to a pause, as well as the frequency of a pause
 */
export const _ = NaN

export const sound = memoized((duration: number, frequency: number): Sound => {
  return [duration, frequency]
})

function isVoiceLineItem(input: unknown): input is VoiceLineItem {
  return input instanceof Array && input.length >= 2 && typeof input[0] === 'number'
}

export function isSound(item: VoiceLineItem): item is Sound {
  return isVoiceLineItem(item) && typeof item[1] === 'number'
}

export const pause = memoized((duration: number): Pause => {
  return sound(duration, _)
})

export function isPause(item: VoiceLineItem): item is Pause {
  return isSound(item) && Object.is(_, item[1])
}

export const note = memoized((duration: number, semitonesFromBase: number): Sound => {
  return sound(duration, calculateFrequency(semitonesFromBase))
})

export function notes(duration: number, semitonesFromBase: number[]): VoiceLine {
  return semitonesFromBase.map((distance) => note(duration, distance))
}
