import { AudioContext, GainNode, OscillatorNode } from 'node-web-audio-api'
import { type Music } from './create-music.js'
import { MusicInterpreter } from './music-interpreter.js'

interface PlayParams {
  readonly startFromLabel?: string
  readonly playUntilLabel?: string

  /**
   * The amount of time to keep oscillators attached to the audio context after the voice had ended
   */
  readonly endCushionMsec?: number
}

export async function play(music: Music, {
  startFromLabel: startLabel,
  playUntilLabel: stopLabel,
  endCushionMsec = 0,
}: PlayParams = {}): Promise<void> {
  if (endCushionMsec < 0 || !Number.isFinite(endCushionMsec)) {
    throw new Error('End cushion must be a finite non-negative number')
  }

  const audioContext = new AudioContext()
  const interpreter = new MusicInterpreter()

  try {
    const { voices, labels } = interpreter.interpret(music)

    const startTime = labels.maybeGetExistingTimeByMaybeText(startLabel) ?? 0
    const stopTime = labels.maybeGetExistingTimeByMaybeText(stopLabel)

    if (stopTime != null && startTime >= stopTime) {
      throw new Error(`Start label ("${startLabel}") must come strictly earlier than stop label ("${stopLabel}")`)
    }

    const played = voices.map(async (voice): Promise<void> => {
      // time of the item that is after the last item of the voice
      const extraItemTime = voice.duration - startTime

      if (extraItemTime < 0) {
        return
      }

      const oscillator = new OscillatorNode(audioContext, { type: 'sine' })
      const gain = new GainNode(audioContext, { gain: 0.25 })

      for (const [frequency, itemTime] of voice.frequencyTimeline) {
        const itemTimeShifted = Math.max(0, itemTime - startTime)

        oscillator.frequency.setValueAtTime(frequency, itemTimeShifted)
      }

      oscillator.frequency.setValueAtTime(0, extraItemTime)

      const durationReduced = (stopTime ?? voice.duration) - startTime

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + durationReduced + (endCushionMsec / 1000))
      oscillator.connect(gain).connect(audioContext.destination)

      return new Promise((resolve) => {
        oscillator.onended = () => {
          oscillator.disconnect()
          gain.disconnect()
          resolve()
        }
      })
    })

    await Promise.all(played)
  } finally {
    await audioContext.close()
  }
}
