import { SEMITONES_PER_OCTAVE } from './scale-context/calculate-semitones-from-base.js'

export const BASE_FREQUENCY = 440

const OCTAVE_FREQUENCY_DIFFERENCE = 2

const SEMITONE_FREQUENCY_DIFFERENCE = OCTAVE_FREQUENCY_DIFFERENCE ** (1 / SEMITONES_PER_OCTAVE)

export function calculateFrequency(semitonesFromBase: number): number {
  return BASE_FREQUENCY * SEMITONE_FREQUENCY_DIFFERENCE ** semitonesFromBase
}
