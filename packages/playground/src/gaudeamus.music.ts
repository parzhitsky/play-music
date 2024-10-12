import { createMusic, note, notes, pause } from './play/create-music.js'

export const gaudeamus = createMusic({ bpm: 80 }, ({ b, d }) => [
  [
    // Soprano

    note(d(3 / 4), 3), note(b / 4, -2), note(b, -2), note(b, 3),
    // gau - - - - - - de - - - - - - - a - - - - - -mus

    note(d(3 / 4), 0), note(b / 4, 0), note(d(2), 0),
    // i - - - - - - - gi - - - - - - -tur

    note(d(3 / 4), 2), note(b / 4, 3), note(b, 5), note(b, 2),
    // ju - - - - - - -ve - - - - - - -nes         dum

    ...notes(b / 2, [3, 7]), note(b, 3), pause(b),
    // su - - - - - - - - - -mus
  ],
  [
    // Alto

    note(d(3 / 4), -5), note(b / 4, -5), note(b, -5), note(b, -5),
    // gau - - - - - - -de - - - - - - - a - - - - - -mus

    note(d(3 / 4), -4), note(b / 4, -4), note(d(2), -4),
    // i - - - - - - - -gi - - - - - - - tur

    note(d(3 / 4), -2), note(b / 4, -2), note(b, -2), note(b, -2),
    // ju - - - - - - - ve - - - - - - - nes          dum

    ...notes(b / 2, [-5, -2]), note(b, -5), pause(b),
    // su - - - - - - - - - - -mus
  ],
  [
    // Tenor

    note(d(3 / 4), -9), note(b / 4, -9), note(b, -9), note(b, -9),
    // gau - - - - - - -de - - - - - - - a - - - - - -mus

    note(d(3 / 4), -9), note(b / 4, -9), note(d(2), -9),
    // i - - - - - - - -gi - - - - - - - tur

    note(d(3 / 4), -7), note(b / 4, -5), note(b, -4), note(b, -7),
    // ju - - - - - - - ve - - - - - - - nes          dum

    note(b, -9), note(b, -9), pause(b),
    // su - - - -mus
  ],
  [
    // Bass

    note(d(3 / 4), -21), note(b / 4, -21), note(b, -21), note(b, -17),
    // gau - - - - - - - de - - - - - - - -a - - - - - - mus

    note(d(3 / 4), -16), note(b / 4, -16), note(d(2), -16),
    // i - - - - - - - - gi - - - - - - - -tur

    note(d(3 / 4), -14), note(b / 4, -14), note(b, -14), note(b, -14),
    // ju - - - - - - - -ve - - - - - - - -nes           dum

    note(b, -21), note(b, -21), pause(b),
    // su - - - - mus
  ],
])
