import { bachPrelude1 } from './bach-prelude-1.music.js'
import { play } from './play/play.js'

await play(bachPrelude1, {
  endCushionMsec: 100,
})
