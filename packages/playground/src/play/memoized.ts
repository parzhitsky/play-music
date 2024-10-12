type Fn<Inputs extends readonly unknown[], Output> = (...inputs: Inputs) => Output

// Values that don't lose information when converted to a string
type Stringifiable = string | number | boolean

export function memoized<Inputs extends readonly Stringifiable[], Output>(fn: Fn<Inputs, Output>): Fn<Inputs, Output> {
  const sep = Math.random().toString(36).slice(2, 6)
  const memo = Object.create(null) as Record<string, Output>

  return (...inputs) => {
    const key = inputs.join(sep)
    const value = memo[key] ??= fn(...inputs)

    return value
  }
}
