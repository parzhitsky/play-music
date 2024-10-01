import { pause, notes, note, createMusic, _ } from './play/create-music.js'

export const bachPrelude1 = createMusic({ bpm: 65 }, ({ b }) => [
  [
    // 1
    ...notes(b / 4, [_, _, -2, 3, 7, -2, 3, 7]),
    ...notes(b / 4, [_, _, -2, 3, 7, -2, 3, 7]),
    ...notes(b / 4, [_, _, 0, 5, 8, 0, 5, 8]),
    ...notes(b / 4, [_, _, 0, 5, 8, 0, 5, 8]),
    ...notes(b / 4, [_, _, -2, 5, 8, -2, 5, 8]),
    ...notes(b / 4, [_, _, -2, 5, 8, -2, 5, 8]),
    ...notes(b / 4, [_, _, -2, 3, 7, -2, 3, 7]),
    ...notes(b / 4, [_, _, -2, 3, 7, -2, 3, 7]),

    // 2
    ...notes(b / 4, [_, _, 0, 7, 12, 0, 7, 12]),
    ...notes(b / 4, [_, _, 0, 7, 12, 0, 7, 12]),
    ...notes(b / 4, [_, _, -3, 0, 5, -3, 0, 5]),
    ...notes(b / 4, [_, _, -3, 0, 5, -3, 0, 5]),
    ...notes(b / 4, [_, _, -2, 5, 10, -2, 5, 10]),
    ...notes(b / 4, [_, _, -2, 5, 10, -2, 5, 10]),
    ...notes(b / 4, [_, _, -5, -2, 3, -5, -2, 3]),
    ...notes(b / 4, [_, _, -5, -2, 3, -5, -2, 3]),

    // 3
    ...notes(b / 4, [_, _, -5, -2, 3, -5, -2, 3]),
    ...notes(b / 4, [_, _, -5, -2, 3, -5, -2, 3]),
    ...notes(b / 4, [_, _, -7, -3, 3, -7, -3, 3]),
    ...notes(b / 4, [_, _, -7, -3, 3, -7, -3, 3]),
    ...notes(b / 4, [_, _, -7, -2, 2, -7, -2, 2]),
    ...notes(b / 4, [_, _, -7, -2, 2, -7, -2, 2]),
    ...notes(b / 4, [_, _, -5, -2, 4, -5, -2, 4]),
    ...notes(b / 4, [_, _, -5, -2, 4, -5, -2, 4]),

    // 4
    // …
  ],
  [
    // 1
    pause(b / 4), note(b * 7 / 4, -5),
    pause(b / 4), note(b * 7 / 4, -5),
    pause(b / 4), note(b * 7 / 4, -7),
    pause(b / 4), note(b * 7 / 4, -7),
    pause(b / 4), note(b * 7 / 4, -7),
    pause(b / 4), note(b * 7 / 4, -7),
    pause(b / 4), note(b * 7 / 4, -5),
    pause(b / 4), note(b * 7 / 4, -5),

    // 2
    pause(b / 4), note(b * 7 / 4, -5),
    pause(b / 4), note(b * 7 / 4, -5),
    pause(b / 4), note(b * 7 / 4, -7),
    pause(b / 4), note(b * 7 / 4, -7),
    pause(b / 4), note(b * 7 / 4, -7),
    pause(b / 4), note(b * 7 / 4, -7),
    pause(b / 4), note(b * 7 / 4, -9),
    pause(b / 4), note(b * 7 / 4, -9),

    // 3
    pause(b / 4), note(b * 7 / 4, -9),
    pause(b / 4), note(b * 7 / 4, -9),
    pause(b / 4), note(b * 7 / 4, -12),
    pause(b / 4), note(b * 7 / 4, -12),
    pause(b / 4), note(b * 7 / 4, -10),
    pause(b / 4), note(b * 7 / 4, -10),
    pause(b / 4), note(b * 7 / 4, -11),
    pause(b / 4), note(b * 7 / 4, -11),

    // 4
    // …
  ],
  [
    // 1
    note(b * 2, -9),
    note(b * 2, -9),
    note(b * 2, -9),
    note(b * 2, -9),
    note(b * 2, -10),
    note(b * 2, -10),
    note(b * 2, -9),
    note(b * 2, -9),

    // 2
    note(b * 2, -9),
    note(b * 2, -9),
    note(b * 2, -9),
    note(b * 2, -9),
    note(b * 2, -10),
    note(b * 2, -10),
    note(b * 2, -10),
    note(b * 2, -10),

    // 3
    note(b * 2, -12),
    note(b * 2, -12),
    note(b * 2, -19),
    note(b * 2, -19),
    note(b * 2, -14),
    note(b * 2, -14),
    note(b * 2, -14),
    note(b * 2, -14),

    // 4
    // …
  ],
])
