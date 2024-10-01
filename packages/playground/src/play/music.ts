export type Sound = readonly [frequency: number, duration: number]
export type Pause = Sound // Pause is a Sound with frequency NaN

type Item = Sound | Pause // TODO: make Item a generic (first element is always a duration)

export type Voice = Iterable<Item>
export type Music = readonly Voice[]

function isItem(input: unknown): input is Item {
  return Array.isArray(input) && input.length === 2 && typeof input[1] === 'number'
}

export function isSound(item: Item): item is Sound {
  return isItem(item) && typeof item[0] === 'number'
}

export function isPause(item: Item): item is Pause {
  return isSound(item) && isNaN(item[0]) // TODO: use `Object.is(_, item[0])` from create-music.ts after merging
}
