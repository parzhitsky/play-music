const degreesSharpedInOrder = [3, 0, 4, 1, 5, 2, 6] as const

const LETTERS_PER_OCTAVE = degreesSharpedInOrder.length
const DEFAULT_ALTERATION = 0
const FIRST_INDEX_SHARPS = 0
const FIRST_INDEX_FLATS = -1

/**
 * Walk along the circle of fifths in the direction of sharps (`steps >= 0`)
 * or flats (`steps < 0`), gather alterations for the given scale (identified by `steps`)
 */
export function getScaleAlterations(steps: number): readonly number[] {
  if (!Number.isInteger(steps)) {
    throw new Error(`Expected an integer, instead got ${steps}`)
  }

  const alterations = Array<number>(LETTERS_PER_OCTAVE).fill(DEFAULT_ALTERATION)
  const step = Math.sign(steps)
  const first = steps < 0 ? FIRST_INDEX_FLATS : FIRST_INDEX_SHARPS
  const last = steps + first

  for (let index = first; index !== last; index += step) {
    const degree = degreesSharpedInOrder.at(index % degreesSharpedInOrder.length)!

    alterations[degree] += step
  }

  return alterations
}
