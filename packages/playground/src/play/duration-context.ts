export const SECONDS_PER_MINUTE = 60

export interface DurationContextParams {
  /**
   * Playback speed in beats per minute
   */
  readonly bpm: number
}

export class DurationContext {
  /**
   * ```ts
   * const c = new DurationContext({ bpm: 100 })
   * const b = c.beatDurationSeconds
   *
   * play([
   *   [note(b * 3 / 4, 0), ...notes(b / 4, [-5, 0, 4, 7, 12]), note(b * 3 / 4, 7)],
   * ])
   * ```
   */
  readonly beatDurationSeconds = SECONDS_PER_MINUTE / this.params.bpm

  /** Alias for {@link beatDurationSeconds} */
  readonly b = this.beatDurationSeconds

  /** Alias for {@link createDuration} (bound to the {@link DurationContext} instance) */
  readonly d = this.createDuration.bind(this)

  constructor(protected readonly params: DurationContextParams) { }

  /**
   * ```ts
   * const c = new DurationContext({ bpm: 60 })
   * const d = c.createDuration
   *
   * play([
   *   [...notes(d(1 / 4), [-9, -5, -2, 3, 7, -2, 3, 7, -9, -5, -2, 3, 7, -2, 3, 7])],
   * ])
   * ```
   */
  createDuration(beatsCount: number): number {
    return beatsCount * this.beatDurationSeconds
  }
}
