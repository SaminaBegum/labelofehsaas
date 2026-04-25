// Utility function to normalize strings for consistent matching
// Example: "Co ords Set" → "co-ords-set"

export const normalize = (str: string = ""): string => {
  if (!str) return "";

  return str
    .toLowerCase()        // convert to lowercase
    .trim()               // remove extra spaces from start/end
    .replace(/\s+/g, "-") // replace spaces with hyphen
    .replace(/-+/g, "-");  // remove multiple hyphens if any
};