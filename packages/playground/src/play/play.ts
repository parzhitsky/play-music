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

    if (startLabel != null && !(startLabel in labels)) {
      throw new Error(`Label "${startLabel}" was not found`)
    }

    if (stopLabel != null && !(stopLabel in labels)) {
      throw new Error(`Label "${stopLabel}" was not found`)
    }

    const startLabelTimestamp = startLabel == null ? 0 : labels[startLabel]
    const stopLabelTimestamp = stopLabel == null ? Infinity : labels[stopLabel]
    const maxDuration = stopLabelTimestamp - startLabelTimestamp

    if (maxDuration <= 0) {
      throw new Error(`Start label ("${startLabel}") must come strictly earlier than stop label ("${stopLabel}")`)
    }

    const voicesPlayed: Promise<void>[] = []

    for (const { frequencyTimeline, duration: durationOriginal } of voices) {
      const oscillator = new OscillatorNode(audioContext, { type: 'sine' })
      const gain = new GainNode(audioContext, { gain: 0.25 })

      for (const [frequency, timestampOriginal] of frequencyTimeline) {
        const timestamp = Math.max(0, timestampOriginal - startLabelTimestamp)

        oscillator.frequency.setValueAtTime(frequency, timestamp)
      }

      const duration = Math.min(maxDuration, durationOriginal)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration)
      oscillator.connect(gain).connect(audioContext.destination)
      voicesPlayed.push(new Promise<void>((resolve) => {
        oscillator.onended = () => {
          oscillator.disconnect()
          gain.disconnect()
          resolve()
        }
      }))
    }

    await audioContext.resume()
    await Promise.all(voicesPlayed)
  } finally {
    await audioContext.close()
  }
}
