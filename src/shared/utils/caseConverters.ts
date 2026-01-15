export function camelCaseToTitleCase(text: string) {
  const withSpaces = text.replace(/([A-Z])/g, ' $1');
  const withSpacesAndFirstCharCapitalized = withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
  return withSpacesAndFirstCharCapitalized;
}
