import { GainNode, OscillatorNode } from 'node-web-audio-api'
import { isPause, type Music } from './create-music-utils.js'

function describeItem(item: unknown, voiceIndex: number, itemIndex: number): string {
  return `item ${JSON.stringify(item)}, voice index ${voiceIndex}, item index ${itemIndex}`
}

interface Voice {
  readonly oscillator: OscillatorNode
  readonly gain: GainNode
  readonly duration: number
}

export interface Interpretation {
  readonly voices: readonly Voice[]
}

export class MusicInterpreter {
  constructor(protected readonly audioContext: AudioContext) {}

  interpret(music: Music): Interpretation {
    const voices: Voice[] = []

    for (const [voiceLineIndex, voiceLine] of music.entries()) {
      const oscillator = new OscillatorNode(this.audioContext, { type: 'sine' })
      const gain = new GainNode(this.audioContext, { gain: 0.25 })

      let soundStartsAt = this.audioContext.currentTime
      let voiceDuration = 0
      let currItemIndex = 0

      for (const item of voiceLine) {
        const [duration, frequency] = item

        if (duration <= 0 || !isFinite(duration)) {
          // TODO: allow zero duration for labels, marks, per-voice instructions, etc.
          throw new Error(`Duration must be a finite positive number (${describeItem(item, voiceLineIndex, currItemIndex)})`)
        }

        const isRest = isPause(item)

        if (!isRest && (frequency <= 0 || !isFinite(frequency))) {
          throw new Error(`Frequency of a sound must be a finite positive number (${describeItem(item, voiceLineIndex, currItemIndex)})`)
        }

        oscillator.frequency.setValueAtTime(isRest ? 0 : frequency, soundStartsAt)

        soundStartsAt += duration
        voiceDuration += duration
        currItemIndex += 1
      }

      voices.push({ oscillator, gain, duration: voiceDuration })
    }

    return { voices }
  }
}
