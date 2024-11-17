export function roundToDecimal(num: number, decimals: number): number {
  return parseFloat(num.toFixed(decimals))
}
