import { GainNode, OscillatorNode } from 'node-web-audio-api'
import { isPause, type Music } from './music.js'

function describeItem(item: unknown, voiceIndex: number, itemIndex: number): string {
  return `item ${JSON.stringify(item)}, voice index ${voiceIndex}, item index ${itemIndex}`
}

interface VoiceLine {
  readonly oscillator: OscillatorNode
  readonly gain: GainNode
  readonly duration: number
}

export interface Interpretation {
  readonly voiceLines: readonly VoiceLine[]
}

export class MusicInterpreter {
  constructor(protected readonly audioContext: AudioContext) {}

  interpret(music: Music): Interpretation {
    const voiceLines: VoiceLine[] = []

    for (const [voiceIndex, voice] of music.entries()) {
      const oscillator = new OscillatorNode(this.audioContext, { type: 'sine' })
      const gain = new GainNode(this.audioContext, { gain: 0.25 })

      let soundStartsAt = this.audioContext.currentTime
      let voiceDuration = 0
      let currItemIndex = 0

      for (const item of voice) {
        const [frequency, duration] = item

        if (duration <= 0 || !isFinite(duration)) {
          // TODO: allow zero duration for labels, marks, per-voice instructions, etc.
          throw new Error(`Duration must be a finite positive number (${describeItem(item, voiceIndex, currItemIndex)})`)
        }

        const isRest = isPause(item)

        if (!isRest && (frequency <= 0 || !isFinite(frequency))) {
          throw new Error(`Frequency of a sound must be a finite positive number (${describeItem(item, voiceIndex, currItemIndex)})`)
        }

        oscillator.frequency.setValueAtTime(isRest ? 0 : frequency, soundStartsAt)

        soundStartsAt += duration
        voiceDuration += duration
        currItemIndex += 1
      }

      voiceLines.push({ oscillator, gain, duration: voiceDuration })
    }

    return { voiceLines }
  }
}
