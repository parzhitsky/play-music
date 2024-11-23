import { getNthLetterAfter, type Letter } from './letter.js'

type Alteration = number // any integer

export type Alterations = Record<Letter, Alteration>

export interface Degree {
  readonly letter: Letter
  readonly alteration: Alteration
}

export class Scale {
  constructor(
    public readonly rootLetter: Letter,
    protected readonly alterations: Alterations,
  ) { }

  getDegreeByLetter(letter: Letter): Degree {
    return {
      letter,
      alteration: this.alterations[letter],
    }
  }

  getDegreeAtIndex(index: number): Degree {
    const letter = getNthLetterAfter(this.rootLetter, index)
    const degree = this.getDegreeByLetter(letter)

    return degree
  }
}
