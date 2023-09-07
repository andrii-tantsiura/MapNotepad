export const stringToKeywords = (text: string): string[] =>
  text
    .trim()
    .toLowerCase()
    .split(/[\s,]+/)
    .map((key) => key.trim())
    .filter((key) => key.length > 0);
