export const capitalizeText = (text: string): string => {
  return text
    .split(/(\s|-|,)/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};
