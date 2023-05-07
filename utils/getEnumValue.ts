export const getEnumValue = <T extends Record<string, string>>(
  enumObject: T,
  value: string = ""
): string => {
  return enumObject[value] ?? value;
};
