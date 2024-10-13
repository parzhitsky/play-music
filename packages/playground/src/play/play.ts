import { AudioContext } from 'node-web-audio-api'
import { type Music } from './music.js'
import { MusicInterpreter } from './music-interpreter.js'

export async function play(music: Music): Promise<void> {
  const audioContext = new AudioContext()
  const interpreter = new MusicInterpreter(audioContext)

  try {
    const { voiceLines } = interpreter.interpret(music)

    const voicesPlayed: Promise<void>[] = []

    for (const { oscillator, gain, duration } of voiceLines) {
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
