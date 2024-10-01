import { AudioContext, GainNode, OscillatorNode } from 'node-web-audio-api' // FIXME: https://github.com/ircam-ismm/node-web-audio-api/pull/138
import { type Music } from './music.type.js'

function describeItem(item: unknown, voiceIndex: number, itemIndex: number): string {
  return `item ${JSON.stringify(item)}, voice index ${voiceIndex}, item index ${itemIndex}`
}

export async function play(music: Music): Promise<void> {
  const audioContext = new AudioContext()
  const voicesPlayed: Promise<void>[] = []

  try {
    for (const [voiceIndex, voice] of music.entries()) {
      const oscillator = new OscillatorNode(audioContext, { type: 'sine' })
      const gain = new GainNode(audioContext, { gain: 0.25 })

      let soundStartsAt = audioContext.currentTime
      let voiceDuration = 0
      let currItemIndex = 0

      for (const item of voice) {
        const [frequency, duration] = item

        if (duration <= 0 || !isFinite(duration)) {
          // TODO: allow zero duration for labels, marks, per-voice instructions, etc.
          throw new Error(`Duration must be a finite positive number (${describeItem(item, voiceIndex, currItemIndex)})`)
        }

        const isRest = isNaN(frequency)

        if (!isRest && (frequency <= 0 || !isFinite(frequency))) {
          throw new Error(`Frequency of a sound must be a finite positive number (${describeItem(item, voiceIndex, currItemIndex)})`)
        }

        oscillator.frequency.setValueAtTime(isRest ? 0 : frequency, soundStartsAt)

        soundStartsAt += duration
        voiceDuration += duration
        currItemIndex += 1
      }

      const voicePlayed = new Promise<void>((resolve) => {
        oscillator.onended = () => {
          oscillator.disconnect()
          gain.disconnect()
          resolve()
        }
      })

      voicesPlayed.push(voicePlayed)

      oscillator.connect(gain).connect(audioContext.destination)
      oscillator.start()
      oscillator.stop(audioContext.currentTime + voiceDuration)
    }

    await Promise.all(voicesPlayed)
  } finally {
    await audioContext.close()
  }
}
