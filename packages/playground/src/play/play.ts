import { AudioContext, GainNode, OscillatorNode } from 'node-web-audio-api'
import { type Music } from './create-music.js'
import { MusicInterpreter } from './music-interpreter.js'

export async function play(music: Music): Promise<void> {
  const audioContext = new AudioContext()
  const interpreter = new MusicInterpreter()

  try {
    const { voices } = interpreter.interpret(music)

    const voicesPlayed: Promise<void>[] = []

    for (const { frequencyTimeline, duration } of voices) {
      const oscillator = new OscillatorNode(audioContext, { type: 'sine' })
      const gain = new GainNode(audioContext, { gain: 0.25 })

      for (const [frequency, time] of frequencyTimeline) {
        oscillator.frequency.setValueAtTime(frequency, time)
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
      oscillator.stop(audioContext.currentTime + duration)
    }

    await Promise.all(voicesPlayed)
  } finally {
    await audioContext.close()
  }
}
