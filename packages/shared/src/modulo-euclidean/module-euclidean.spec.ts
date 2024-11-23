import { moduloEuclidean } from './modulo-euclidean.js'

describe('moduloEuclidean', () => {
  it('should return the correct positive remainder', () => {
    expect(moduloEuclidean(5, 12)).toBe(2)
  })

  it('should return zero when value is a multiple of base', () => {
    expect(moduloEuclidean(5, 10)).toBe(0)
  })

  it('should handle negative values correctly', () => {
    expect(moduloEuclidean(5, -3)).toBe(2)
  })

  it('should handle negative base correctly', () => {
    expect(moduloEuclidean(-5, 12)).toBe(-3)
  })

  it('should handle both negative base and value correctly', () => {
    expect(moduloEuclidean(-5, -12)).toBe(-2)
  })
})
