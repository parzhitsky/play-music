import { WithOptional } from '@@libs/@eco/utils/with-optional/with-optional.type.js'
import { moduloEuclidean as euc } from '@@shared/modulo-euclidean/modulo-euclidean.js'
import { getSemitonesFromBaseLetterTo, SEMITONES_PER_OCTAVE } from './calculate-semitones-from-base.js'
import { type Letter, LETTERS_PER_OCTAVE } from './letter.js'
import { Alterations, Degree, Scale } from './scale.js'

export const DEFAULT_ALTERATION: number = 0

export type RootDegreeInput = Letter | Degree | WithOptional<Degree, 'alteration'>

type Interval = number // non-negative integer

export type IntervalComposition = readonly [
  Interval, // amount of semitones between the 1st and 2nd degrees
  Interval, // amount of semitones between the 2nd and 3rd degrees, etc.
  Interval,
  Interval,
  Interval,
  Interval,
  Interval, // amount of semitones between the 7th degree in this octave and the 1st degree in the next (higher) octave
]

export function createScale(root: RootDegreeInput, intervals: IntervalComposition): Scale {
  if (intervals.length !== LETTERS_PER_OCTAVE) {
    // We could infer the last interval from the others and the total sum requirement,
    // but we chose simplicity of implementation at the small cost of explicit input.
    throw new Error(`Expected ${LETTERS_PER_OCTAVE} intervals, instead got ${intervals.length}.`)
  }

  const sum = intervals.reduce((acc, interval) => acc + interval, 0)

  if (sum !== SEMITONES_PER_OCTAVE) {
    throw new Error(`Expected the sum of the intervals to be ${SEMITONES_PER_OCTAVE}, instead got ${sum}.`)
  }

  if (typeof root === 'number') {
    root = { letter: root }
  }

  let currLetter = root.letter
  let currAlteration = root.alteration ?? DEFAULT_ALTERATION

  const jumps = intervals.slice(0, -1)
  const alterations = Object.create(null) as Alterations

  alterations[currLetter] = currAlteration

  for (const jump of jumps) {
    const prevLetter = currLetter
    const prevAlteration = currAlteration

    currLetter += 1
    currLetter %= LETTERS_PER_OCTAVE

    const semisToCurr = getSemitonesFromBaseLetterTo(currLetter)
    const semisToPrev = getSemitonesFromBaseLetterTo(prevLetter)
    const jumpNatural = euc(SEMITONES_PER_OCTAVE, semisToCurr - semisToPrev)

    alterations[currLetter] = currAlteration = prevAlteration + jump - jumpNatural
  }

  const scale = new Scale(root.letter, alterations)

  return scale
}
