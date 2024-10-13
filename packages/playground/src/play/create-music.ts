import { DurationContext, DurationContextParams } from "./duration-context.js"

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
  (durationContext: DurationContext): VoiceLines
}

interface CreateMusicParams extends DurationContextParams {
  // so far, no additional parameters
}

export function createMusic(params: CreateMusicParams, getVoices: VoiceLinesGetter): Music {
  const { ...durationContextParams } = params

  const durationContext = new DurationContext(durationContextParams)
  const voices = getVoices(durationContext)

  return voices
}
