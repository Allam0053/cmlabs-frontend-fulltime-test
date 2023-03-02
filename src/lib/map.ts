export function getMapValues<K, T>(map: Map<K, T>): T[] {
  const values: T[] = [];
  map.forEach((value) => values.push(value));
  return values;
}

export function getSetValues<T>(set: Set<T>): T[] {
  const values: T[] = [];
  set.forEach((value) => values.push(value));
  return values;
}
