import { createMusic } from './play/create-music.js'
import { pause, semis, semi, _ } from './play/create-music-utils.js'

export const bachPrelude1 = createMusic({ bpm: 65 }, ({ b, d }, {
  d1o3n0: d3,
  d2o3n0: e3,
  d3o3n0: f3,
  d4o3n0: g3,
  d5o3b1: a3b,
  d5o3n0: a3,
  d6o3b1: b3, // FIXME: is octave lower when transposed to D major
  d6o3n0: h3, // FIXME: is octave lower when transposed to D major
  d0o4n0: c4,
  d1o4n0: d4,
  d2o4n0: e4,
  d3o4n0: f4,
  d3o4x1: f4x,
  d4o4n0: g4,
  d5o4n0: a4,
  d6o4n0: h4, // FIXME: is octave lower when transposed to D major
  d0o5n0: c5,
  d0o5x1: c5x,
  d1o5n0: d5,
  d2o5n0: e5,
  d3o5n0: f5,
  d4o5n0: g5,
  d5o5n0: a5,
}) => [
  [
    // 1
    ...semis(b / 4, [_, _, g4, c5, e5, g4, c5, e5]),
    ...semis(b / 4, [_, _, g4, c5, e5, g4, c5, e5]),
    ...semis(b / 4, [_, _, a4, d5, f5, a4, d5, f5]),
    ...semis(b / 4, [_, _, a4, d5, f5, a4, d5, f5]),
    ...semis(b / 4, [_, _, g4, d5, f5, g4, d5, f5]),
    ...semis(b / 4, [_, _, g4, d5, f5, g4, d5, f5]),
    ...semis(b / 4, [_, _, g4, c5, e5, g4, c5, e5]),
    ...semis(b / 4, [_, _, g4, c5, e5, g4, c5, e5]),

    // 2
    ...semis(b / 4, [_, _, a4, e5, a5, a4, e5, a5]),
    ...semis(b / 4, [_, _, a4, e5, a5, a4, e5, a5]),
    ...semis(b / 4, [_, _, f4x, a4, d5, f4x, a4, d5]),
    ...semis(b / 4, [_, _, f4x, a4, d5, f4x, a4, d5]),
    ...semis(b / 4, [_, _, g4, d5, g5, g4, d5, g5]),
    ...semis(b / 4, [_, _, g4, d5, g5, g4, d5, g5]),
    ...semis(b / 4, [_, _, e4, g4, c5, e4, g4, c5]),
    ...semis(b / 4, [_, _, e4, g4, c5, e4, g4, c5]),

    // 3
    ...semis(b / 4, [_, _, e4, g4, c5, e4, g4, c5]),
    ...semis(b / 4, [_, _, e4, g4, c5, e4, g4, c5]),
    ...semis(b / 4, [_, _, d4, f4x, c5, d4, f4x, c5]),
    ...semis(b / 4, [_, _, d4, f4x, c5, d4, f4x, c5]),
    ...semis(b / 4, [_, _, d4, g4, h4, d4, g4, h4]),
    ...semis(b / 4, [_, _, d4, g4, h4, d4, g4, h4]),
    ...semis(b / 4, [_, _, e4, g4, c5x, e4, g4, c5x]),
    ...semis(b / 4, [_, _, e4, g4, c5x, e4, g4, c5x]),

    // 4
    ...semis(b / 4, [_, _, d4, a4, d5, d4, a4, d5]),
    ...semis(b / 4, [_, _, d4, a4, d5, d4, a4, d5]),
    ...semis(b / 4, [_, _, d4, f4, h4, d4, f4, h4]),
    ...semis(b / 4, [_, _, d4, f4, h4, d4, f4, h4]),
    ...semis(b / 4, [_, _, c4, g4, c5, c4, g4, c5]),
    ...semis(b / 4, [_, _, c4, g4, c5, c4, g4, c5]),
    ...semis(b / 4, [_, _, a3, c4, f4, a3, c4, f4]),
    ...semis(b / 4, [_, _, a3, c4, f4, a3, c4, f4]),
  ],
  [
    // 1
    pause(b / 4), semi(d(7 / 4), e4),
    pause(b / 4), semi(d(7 / 4), e4),
    pause(b / 4), semi(d(7 / 4), d4),
    pause(b / 4), semi(d(7 / 4), d4),
    pause(b / 4), semi(d(7 / 4), d4),
    pause(b / 4), semi(d(7 / 4), d4),
    pause(b / 4), semi(d(7 / 4), e4),
    pause(b / 4), semi(d(7 / 4), e4),

    // 2
    pause(b / 4), semi(d(7 / 4), e4),
    pause(b / 4), semi(d(7 / 4), e4),
    pause(b / 4), semi(d(7 / 4), d4),
    pause(b / 4), semi(d(7 / 4), d4),
    pause(b / 4), semi(d(7 / 4), d4),
    pause(b / 4), semi(d(7 / 4), d4),
    pause(b / 4), semi(d(7 / 4), c4),
    pause(b / 4), semi(d(7 / 4), c4),

    // 3
    pause(b / 4), semi(d(7 / 4), c4),
    pause(b / 4), semi(d(7 / 4), c4),
    pause(b / 4), semi(d(7 / 4), a3),
    pause(b / 4), semi(d(7 / 4), a3),
    pause(b / 4), semi(d(7 / 4), h3),
    pause(b / 4), semi(d(7 / 4), h3),
    pause(b / 4), semi(d(7 / 4), b3),
    pause(b / 4), semi(d(7 / 4), b3),

    // 4
    pause(b / 4), semi(d(7 / 4), a3),
    pause(b / 4), semi(d(7 / 4), a3),
    pause(b / 4), semi(d(7 / 4), a3b),
    pause(b / 4), semi(d(7 / 4), a3b),
    pause(b / 4), semi(d(7 / 4), g3),
    pause(b / 4), semi(d(7 / 4), g3),
    pause(b / 4), semi(d(7 / 4), f3),
    pause(b / 4), semi(d(7 / 4), f3),
  ],
  [
    // 1
    semi(d(2), c4),
    semi(d(2), c4),
    semi(d(2), c4),
    semi(d(2), c4),
    semi(d(2), h3),
    semi(d(2), h3),
    semi(d(2), c4),
    semi(d(2), c4),

    // 2
    semi(d(2), c4),
    semi(d(2), c4),
    semi(d(2), c4),
    semi(d(2), c4),
    semi(d(2), h3),
    semi(d(2), h3),
    semi(d(2), h3),
    semi(d(2), h3),

    // 3
    semi(d(2), a3),
    semi(d(2), a3),
    semi(d(2), d3),
    semi(d(2), d3),
    semi(d(2), g3),
    semi(d(2), g3),
    semi(d(2), g3),
    semi(d(2), g3),

    // 4
    semi(d(2), f3),
    semi(d(2), f3),
    semi(d(2), f3),
    semi(d(2), f3),
    semi(d(2), e3),
    semi(d(2), e3),
    semi(d(2), e3),
    semi(d(2), e3),
  ],
])
