import { type Scale } from './scale.js'
import { DegreeCode, DegreeCodeParser } from './degree-code-parser.js'

class ScaleContextProxyHandler implements ProxyHandler<ScaleContext> {
  protected readonly degreeCodeParser = new DegreeCodeParser(this.scale)

  constructor(protected readonly scale: Scale) {}

  get(target: ScaleContext, key: string | symbol, receiver: unknown): unknown {
    if (key in target || typeof key === 'symbol') {
      return Reflect.get(target, key, receiver)
    }

    const semitones = this.degreeCodeParser.parse(key)

    if (semitones == null) {
      return Reflect.get(target, key, receiver)
    }

    target[key as DegreeCode] = semitones

    return semitones
  }
}

const DegreeCodeToSemitonesMap = class { } as { new(): Record<DegreeCode, number> }

export class ScaleContext extends DegreeCodeToSemitonesMap {
  constructor(scale: Scale) {
    super()

    return new Proxy(this, new ScaleContextProxyHandler(scale))
  }
}
