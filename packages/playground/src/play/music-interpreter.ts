import { type Music } from './create-music.js'
import { isLabel, isPause } from './create-music-utils.js'
import { Labels } from './labels.js'

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
  readonly labels: Labels.Readonly
}

export class MusicInterpreter {
  interpret(music: Music): Interpretation {
    const voices: Voice[] = []
    const labels = new Labels()

    for (const [voiceLineIndex, voiceLine] of music.entries()) {
      const frequencyTimeline: SetValueAtTimeParams[] = []

      let nextItemStart = 0
      let currItemIndex = 0

      for (const item of voiceLine) {
        if (isLabel(item)) {
          labels.add(item[1], nextItemStart)
        } else {
          const [duration, frequency] = item

          if (duration <= 0 || !isFinite(duration)) {
            // TODO: allow zero duration for labels, marks, per-voice instructions, etc.
            throw new Error(`Duration must be a finite positive number (${describeItem(item, voiceLineIndex, currItemIndex)})`)
          }

          const isRest = isPause(item)

          if (!isRest && (frequency <= 0 || !isFinite(frequency))) {
            throw new Error(`Frequency of a sound must be a finite positive number (${describeItem(item, voiceLineIndex, currItemIndex)})`)
          }

          frequencyTimeline.push([isRest ? 0 : frequency, nextItemStart])

          nextItemStart += duration
        }

        currItemIndex += 1
      }

      voices.push({ frequencyTimeline, duration: nextItemStart })
    }

    return {
      voices,
      labels,
    }
  }
}
