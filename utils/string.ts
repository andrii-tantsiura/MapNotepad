export const stringToKeywords = (text: string) =>
  text
    ?.trim()
    .toLowerCase()
    .split(/[\s,]+/)
    .map((key) => key.trim());
