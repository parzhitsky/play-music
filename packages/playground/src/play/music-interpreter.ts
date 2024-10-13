import { isPause, type Music } from './create-music-utils.js'

function describeItem(item: unknown, voiceIndex: number, itemIndex: number): string {
  return `item ${JSON.stringify(item)}, voice index ${voiceIndex}, item index ${itemIndex}`
}

type SetValueAtTimeParams = Readonly<Parameters<AudioParam['setValueAtTime']>>

interface Voice {
  readonly frequencyTimeline: readonly SetValueAtTimeParams[]
  readonly duration: number
}

export interface Interpretation {
  readonly voices: readonly Voice[]
}

export class MusicInterpreter {
  interpret(music: Music): Interpretation {
    const voices: Voice[] = []

    for (const [voiceLineIndex, voiceLine] of music.entries()) {
      const frequencyTimeline: SetValueAtTimeParams[] = []

      let soundStartsAt = 0
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

        frequencyTimeline.push([isRest ? 0 : frequency, soundStartsAt])

        soundStartsAt += duration
        voiceDuration += duration
        currItemIndex += 1
      }

      voices.push({ frequencyTimeline, duration: voiceDuration })
    }

    return { voices }
  }
}
