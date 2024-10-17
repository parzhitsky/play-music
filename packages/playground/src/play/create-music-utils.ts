import { calculateFrequency } from "./calculate-frequency.js"
import { Sound, Pause, Label, VoiceLineItem, VoiceLine } from "./create-music.js"

/**
 * Alias for `NaN`, which is both the distance from the base note to a pause, as well as the frequency of a pause
 */
export const _ = NaN

export function sound(duration: number, frequency: number): Sound {
  return [duration, frequency]
}

function isVoiceLineItem(input: unknown): input is VoiceLineItem {
  return input instanceof Array && input.length >= 2 && typeof input[0] === 'number'
}

export function isSound(item: VoiceLineItem): item is Sound {
  return isVoiceLineItem(item) && typeof item[1] === 'number'
}

export function pause(duration: number): Pause {
  return sound(duration, _)
}

export function isPause(item: VoiceLineItem): item is Pause {
  return isSound(item) && Object.is(_, item[1])
}

export function semi(duration: number, semitonesFromBase: number): Sound {
  return sound(duration, calculateFrequency(semitonesFromBase))
}

export function semis(duration: number, semitonesFromBase: number[]): VoiceLine {
  return semitonesFromBase.map((distance) => semi(duration, distance))
}

export function label(text: string): Label {
  return [0, text]
}

function isLasting(item: VoiceLineItem): boolean {
  return item[0] > 0
}

export function isLabel(item: VoiceLineItem): item is Label {
  return !isLasting(item) && typeof item[1] === 'string'
}
