export type Sound = readonly [frequency: number, durationSeconds: number]
export type Voice = Iterable<Sound>
export type Music = readonly Voice[]
