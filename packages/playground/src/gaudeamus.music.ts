import { createMusic } from './play/create-music.js'
import { label, semi, semis, pause } from './play/create-music-utils.js'

export const gaudeamus = createMusic({ bpm: 80 }, ({ b, d }) => [
  [
    // Soprano

    semi(d(3 / 4), 3), semi(b / 4, -2), semi(b, -2), semi(b, 3),
    // gau - - - - - - de - - - - - - - a - - - - - -mus

    semi(d(3 / 4), 0), semi(b / 4, 0), semi(d(2), 0), label("1"),
    // i - - - - - - - gi - - - - - - -tur

    semi(d(3 / 4), 2), semi(b / 4, 3), semi(b, 5), semi(b, 2),
    // ju - - - - - - -ve - - - - - - -nes         dum

    ...semis(b / 2, [3, 7]), semi(b, 3), pause(b),
    // su - - - - - - - - - -mus
  ],
  [
    // Alto

    semi(d(3 / 4), -5), semi(b / 4, -5), semi(b, -5), semi(b, -5),
    // gau - - - - - - -de - - - - - - - a - - - - - -mus

    semi(d(3 / 4), -4), semi(b / 4, -4), semi(d(2), -4),
    // i - - - - - - - -gi - - - - - - - tur

    semi(d(3 / 4), -2), semi(b / 4, -2), semi(b, -2), semi(b, -2),
    // ju - - - - - - - ve - - - - - - - nes          dum

    ...semis(b / 2, [-5, -2]), semi(b, -5), pause(b),
    // su - - - - - - - - - - -mus
  ],
  [
    // Tenor

    semi(d(3 / 4), -9), semi(b / 4, -9), semi(b, -9), semi(b, -9),
    // gau - - - - - - -de - - - - - - - a - - - - - -mus

    semi(d(3 / 4), -9), semi(b / 4, -9), semi(d(2), -9),
    // i - - - - - - - -gi - - - - - - - tur

    semi(d(3 / 4), -7), semi(b / 4, -5), semi(b, -4), semi(b, -7), label("2"),
    // ju - - - - - - - ve - - - - - - - nes          dum

    semi(b, -9), semi(b, -9), pause(b),
    // su - - - -mus
  ],
  [
    // Bass

    semi(d(3 / 4), -21), semi(b / 4, -21), semi(b, -21), semi(b, -17),
    // gau - - - - - - - de - - - - - - - -a - - - - - - mus

    semi(d(3 / 4), -16), semi(b / 4, -16), semi(d(2), -16),
    // i - - - - - - - - gi - - - - - - - -tur

    semi(d(3 / 4), -14), semi(b / 4, -14), semi(b, -14), semi(b, -14),
    // ju - - - - - - - -ve - - - - - - - -nes           dum

    semi(b, -21), semi(b, -21), pause(b),
    // su - - - - mus
  ],
])
