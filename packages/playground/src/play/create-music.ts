import { DurationContext, DurationContextParams } from './duration-context.js'
import { createScale } from './scale-context/create-scale.js'
import { Letter } from './scale-context/letter.js'
import { ScaleContext } from './scale-context/scale-context.js'
import { Scale } from './scale-context/scale.js'

type VoiceLineItemBase<Payload extends readonly [unknown, ...unknown[]]> = readonly [duration: number, ...payload: Payload]

export type Sound = VoiceLineItemBase<[frequency: number]>
export type Pause = Sound // pause is a sound with NaN frequency
export type Label = VoiceLineItemBase<[text: string]>
export type VoiceLineItem =
  | Sound
  | Pause
  | Label

export type VoiceLine = Iterable<VoiceLineItem>
export type VoiceLines = readonly VoiceLine[]

/** Alias for {@link VoiceLines} */
export type Music = VoiceLines

interface VoiceLinesGetter {
  (
    durationContext: DurationContext,
    scaleContext: ScaleContext,
  ): VoiceLines
}

interface CreateMusicParams extends DurationContextParams {
  readonly scale?: Scale
}

const cMajor = createScale(Letter.C, [2, 2, 1, 2, 2, 2, 1])

export function createMusic(params: CreateMusicParams, getVoiceLines: VoiceLinesGetter): Music {
  const {
    scale = cMajor,
    ...durationContextParams
  } = params

  const durationContext = new DurationContext(durationContextParams)
  const scaleContext = new ScaleContext(scale)
  const voiceLines = getVoiceLines(durationContext, scaleContext)

  return voiceLines
}
