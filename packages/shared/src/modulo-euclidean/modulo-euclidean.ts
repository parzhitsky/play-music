export function moduloEuclidean(base: number, value: number): number {
  return (value % base + base) % base
}
