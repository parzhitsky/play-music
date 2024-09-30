export function memoized<Inputs extends readonly (string | number)[], Output>(fn: (...inputs: Inputs) => Output): (...inputs: Inputs) => Output {
  const delimiter = Math.random().toString(36).slice(2)
  const memo = Object.create(null) as Record<string, Output>

  return (...inputs) => {
    const key = inputs.join(delimiter)

    return memo[key] ??= fn(...inputs)
  }
}
