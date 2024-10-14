export const SEMITONES_PER_OCTAVE = 12

const letterToSemitonesFromBase = {
  c: -9,
  d: -7,
  e: -5,
  f: -4,
  g: -2,
  a: 0,
  h: 2,
} satisfies Readonly<Record<string, number>>

type Letter = keyof typeof letterToSemitonesFromBase

export const BASE_LETTER: Letter = 'a'

export const BASE_OCTAVE: number = 4

const DEFAULT_ALTERATION: number = 0

export function calculateSemitonesFromBase(letter: Letter, octave = BASE_OCTAVE, alteration = DEFAULT_ALTERATION): number {
  if (octave % 1) {
    throw new Error(`Expected octave to be an integer, instead got ${octave}`)
  }

  const octaveDifference = octave - BASE_OCTAVE
  const letterDifference = letterToSemitonesFromBase[letter]
  const semitonesFromBase = octaveDifference * SEMITONES_PER_OCTAVE + letterDifference + alteration

  return semitonesFromBase
}
