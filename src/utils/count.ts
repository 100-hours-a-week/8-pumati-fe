export function abbreviateCountToK(count: number): string {
  if (count < 1000) return String(count);

  const value = count / 1000;
  const fixed = value.toFixed(1);
  const short = fixed.endsWith('.0') ? fixed.slice(0, -2) : fixed;

  return `${short}k`;
}
