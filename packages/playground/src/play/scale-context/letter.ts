import { moduloEuclidean as euc } from "@@shared/modulo-euclidean/modulo-euclidean.js"

export const LETTERS_PER_OCTAVE = 7

export const enum Letter {
  C = 0,
  D = 1,
  E = 2,
  F = 3,
  G = 4,
  A = 5,
  H = 6,
}

export function getNthLetterAfter(letter: Letter, count: number): Letter {
  return euc(LETTERS_PER_OCTAVE, letter + count)
}
