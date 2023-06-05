export function getKeyByValue<T = string> (
	object: Record<string, unknown>,
	value: unknown
): T {
	const keyIndex = Object.values(object).indexOf(value)
	return Object.keys(object)[keyIndex] as T
}
