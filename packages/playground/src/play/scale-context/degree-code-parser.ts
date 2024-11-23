import { calculateSemitonesFromBase } from './calculate-semitones-from-base.js'
import { NATURAL_PREFIX, SHARP_PREFIX, FLAT_PREFIX, DEGREE_PREFIX, degreeIndexes, OCTAVE_PREFIX, octaveIndexes, alterationAmounts } from './degree-code.js'
import { Scale } from './scale.js'

export { type DegreeCode } from './degree-code.js'

const alterationMultipliers = {
  [NATURAL_PREFIX]: 0,
  [SHARP_PREFIX]: 1,
  [FLAT_PREFIX]: -1,
} as const

const degreeCodePattern = ((): RegExp => {
  const groupOf = (items: readonly (string | number)[]) => `[${items.join('')}]`

  const degreeIndexCode = String.raw`${DEGREE_PREFIX}(?<degree>${groupOf(degreeIndexes)})`
  const octaveCode = String.raw`${OCTAVE_PREFIX}(?<octave>${groupOf(octaveIndexes)})`
  const naturalCode = String.raw`(?<natural>(${NATURAL_PREFIX})0)`
  const alteredCode = String.raw`(?<altered>${groupOf([SHARP_PREFIX, FLAT_PREFIX])})(?<alteration>${groupOf(alterationAmounts)})`
  const pattern = new RegExp(String.raw`^${degreeIndexCode}${octaveCode}(?:${naturalCode}|${alteredCode})$`)

  return pattern
})()

type MatchGroups = {
  readonly degree: string
  readonly octave: string
  readonly natural?: string
  readonly altered?: string
  readonly alteration?: string
}

export class DegreeCodeParser {
  constructor(protected readonly scale: Scale) { }

  parse(code: string): number | null {
    const match = code.match(degreeCodePattern)

    if (!match) {
      return null
    }

    const raw = match.groups as MatchGroups

    const alterationPrefix = (raw.altered ?? NATURAL_PREFIX) as keyof typeof alterationMultipliers
    const alterationChange = parseInt(raw.alteration ?? '0', 0) * alterationMultipliers[alterationPrefix]
    const degreeIndex = parseInt(raw.degree, 0)
    const octaveIndex = parseInt(raw.octave, 0)
    const degree = this.scale.getDegreeAtIndex(degreeIndex)
    const semitones = calculateSemitonesFromBase(degree.letter, octaveIndex, degree.alteration + alterationChange)

    return semitones
  }
}
