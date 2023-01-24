//Function to trim all whitespace from the start and end of a string
export const trimNewLine = (str: string): string => {
  // Replace all new lines from start and end of string
  return str.replace(/^\s+|\s+$/g, '');
};
