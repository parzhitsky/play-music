import { AudioContext, GainNode, OscillatorNode } from 'node-web-audio-api' // FIXME: https://github.com/ircam-ismm/node-web-audio-api/pull/138
import { type Music } from './music.type.js'

export async function play(music: Music): Promise<void> {
  const audioContext = new AudioContext()
  const voicesPlayed: Promise<void>[] = []

  for (const voice of music) {
    const oscillator = new OscillatorNode(audioContext, { type: 'sine' })
    const gain = new GainNode(audioContext, { gain: 0.25 })

    let soundStartsAt = audioContext.currentTime
    let voiceDuration = 0

    for (const [frequency, duration] of voice) {
      if (duration <= 0 || !isFinite(duration)) {
        throw new Error('Duration must be a finite positive number')
      }

      const isRest = isNaN(frequency)

      if (frequency <= 0 || !isFinite(frequency) && !isRest) {
        throw new Error('Frequency must be either a finite positive number or a NaN')
      }

      oscillator.frequency.setValueAtTime(isRest ? 0 : frequency, soundStartsAt)

      soundStartsAt += duration
      voiceDuration += duration
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
  await audioContext.close()
}
