import { sortedPush } from './sorted-push.js'

type Pair = readonly [text: string, time: number]

export class Labels {
  protected readonly textTimePairs: Pair[] = []
  protected readonly textsInOrder: string[] = []
  protected readonly textToPairMap = Object.create(null) as Record<string, Pair>
  protected readonly timeToPairMap = Object.create(null) as Record<number, Pair>
  private readonly comparePairsByTime = (a: Pair, b: Pair) => a[1] - b[1]

  has(text: string): boolean {
    return text in this.textToPairMap
  }

  add(...pair: Pair): void {
    const [text, time] = pair

    if (this.has(text)) {
      throw new Error(`Label "${text}" is already defined`)
    }

    if (time < 0) {
      throw new Error(`Label "${text}" has a negative time (${time}), which is not allowed`)
    }

    const pairAtTime = this.timeToPairMap[time]

    if (pairAtTime) {
      throw new Error(`Labels "${text}" and "${pairAtTime[0]}" both have exactly the same time (${time}), which is not allowed`)
    }

    const pairIndex = sortedPush(this.textTimePairs, pair, this.comparePairsByTime)

    this.textsInOrder.splice(pairIndex, 0, text)
    this.textToPairMap[text] = pair
    this.timeToPairMap[time] = pair
  }

  protected getPairByText(text: string): Pair | null {
    return this.textToPairMap[text] ?? null
  }

  getTimeByText(text: string): number | null {
    const pair = this.getPairByText(text)

    return pair?.[1] ?? null
  }

  getExistingTimeByText(text: string): number {
    const time = this.getTimeByText(text)

    if (time == null) {
      throw new Error(`Label "${text}" was not found`)
    }

    return time
  }

  /**
   * If `text` is nullish, returns `null`; otherwise, the label must exist
   */
  maybeGetExistingTimeByMaybeText(text: string | null | undefined): number | null {
    return text == null ? null : this.getExistingTimeByText(text)
  }

  protected getEffectivePairIndexByTime(time: number): number {
    for (let pairIndex = 0; pairIndex < this.textTimePairs.length; pairIndex++) {
      const curr = this.textTimePairs[pairIndex]
      const next = this.textTimePairs[pairIndex + 1]

      if (time >= curr[1] && (!next || time < next[1])) {
        return pairIndex
      }
    }

    return -1
  }

  getEffectiveTextByTime(time: number): string | null {
    const pairIndex = this.getEffectivePairIndexByTime(time)
    const pair = this.textTimePairs[pairIndex]

    return pair?.[0] ?? null
  }

  getNextTextAfter(text: string): string | null {
    const pairIndex = this.textsInOrder.indexOf(text)

    if (pairIndex === -1) {
      return null
    }

    return this.textsInOrder[pairIndex + 1] ?? null
  }
}

export namespace Labels {
  export type Readonly = Omit<Labels, 'add'>
}
