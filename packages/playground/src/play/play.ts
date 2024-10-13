import { AudioContext, GainNode, OscillatorNode } from 'node-web-audio-api'
import { type Music } from './create-music.js'
import { MusicInterpreter } from './music-interpreter.js'

interface PlayParams {
  readonly startFromLabel?: string
  readonly playUntilLabel?: string
}

export async function play(music: Music, {
  startFromLabel: startLabel,
  playUntilLabel: stopLabel,
}: PlayParams = {}): Promise<void> {
  const audioContext = new AudioContext()
  const interpreter = new MusicInterpreter()

  try {
    await audioContext.suspend()

    const { voices, labels } = interpreter.interpret(music)

    const startTime = labels.maybeGetExistingTimeByMaybeText(startLabel) ?? 0
    const stopTime = labels.maybeGetExistingTimeByMaybeText(stopLabel) ?? Infinity

    if (startTime >= stopTime) {
      throw new Error(`Start label ("${startLabel}") must come strictly earlier than stop label ("${stopLabel}")`)
    }

    const played = voices.map((voice): Promise<void> => {
      const oscillator = new OscillatorNode(audioContext, { type: 'sine' })
      const gain = new GainNode(audioContext, { gain: 0.25 })

      for (const [frequency, itemTime] of voice.frequencyTimeline) {
        const itemTimeShifted = Math.max(0, itemTime - startTime)

        oscillator.frequency.setValueAtTime(frequency, itemTimeShifted)
      }

      const durationReduced = Math.min(stopTime - startTime, voice.duration)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + durationReduced)
      oscillator.connect(gain).connect(audioContext.destination)

      return new Promise((resolve) => {
        oscillator.onended = () => {
          oscillator.disconnect()
          gain.disconnect()
          resolve()
        }
      })
    })

    await audioContext.resume()
    await Promise.all(played)
  } finally {
    await audioContext.close()
  }
}
