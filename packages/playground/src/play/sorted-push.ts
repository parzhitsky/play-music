interface Comparator<Item> {
  (a: Item, b: Item): number
}

/**
 * @param compare Produces a negative number if `a` should come before `b`, a positive number if `a` should come after `b`, or zero if they are equal
 * @returns The index at which the item was inserted
 */
export function sortedPush<Item>(items: Item[], item: Item, compare: Comparator<Item>): number {
  let left = 0
  let right = items.length

  while (left < right) {
    const middle = left + right >>> 1
    const comparison = compare(items[middle], item) || 0
    const direction = Math.sign(comparison)

    if (direction === -1) {
      left = middle + 1
    } else {
      right = middle
    }
  }

  items.splice(left, 0, item)

  return left
}
