import { Letter } from './letter.js'

export const SEMITONES_PER_OCTAVE = 12
export const BASE_LETTER = Letter.A
export const BASE_ALTERATION = 0
export const BASE_OCTAVE = 4

const semitonesFromBaseLetterTo = {
  [Letter.C]: -9,
  [Letter.D]: -7,
  [Letter.E]: -5,
  [Letter.F]: -4,
  [Letter.G]: -2,
  [Letter.A]: 0,
  [Letter.H]: 2,
} as const

export function getSemitonesFromBaseLetterTo(letter: Letter): number {
  return semitonesFromBaseLetterTo[letter]
}

export function calculateSemitonesFromBase(letter: Letter, octave: number, alteration: number): number {
  if (octave % 1) {
    throw new Error(`Expected octave to be an integer, instead got ${octave}`)
  }

  if (alteration % 1) {
    throw new Error(`Expected alteration to be an integer, instead got ${alteration}`)
  }

  const octaveDifference = octave - BASE_OCTAVE
  const letterDifference = getSemitonesFromBaseLetterTo(letter)
  const semitonesFromBase = octaveDifference * SEMITONES_PER_OCTAVE + letterDifference + alteration

  return semitonesFromBase
}
