export const DEGREE_PREFIX = 'd'
export const OCTAVE_PREFIX = 'o'
export const NATURAL_PREFIX = 'n'
export const SHARP_PREFIX = 'x'
export const FLAT_PREFIX = 'b'

type DegreePrefix = typeof DEGREE_PREFIX
type OctavePrefix = typeof OCTAVE_PREFIX
type NaturalPrefix = typeof NATURAL_PREFIX
type SharpPrefix = typeof SHARP_PREFIX
type FlatPrefix = typeof FLAT_PREFIX

export const degreeIndexes = [0, 1, 2, 3, 4, 5, 6] as const
export const octaveIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const
export const alterationAmounts = [1, 2] as const

type DegreeIndex = typeof degreeIndexes[number]
type OctaveIndex = typeof octaveIndexes[number]
type AlterationAmount = typeof alterationAmounts[number]

type DegreeIndexCode = `${DegreePrefix}${DegreeIndex}`
type OctaveCode = `${OctavePrefix}${OctaveIndex}`
type AlterationCode = `${NaturalPrefix}0` | `${SharpPrefix | FlatPrefix}${AlterationAmount}`

export type DegreeCode = `${DegreeIndexCode}${OctaveCode}${AlterationCode}`
