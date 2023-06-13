import languages from "../tools/languages.js";

/**
 * A function to get the language name by it's ISO code
 * @param {string} code - The ISO code of the language
 * @returns language name
 */
export default function getLanguageByCode(code: string) {
  if (typeof code !== "string") return null;

  return (
    languages.find(
      (l) =>
        l.code ==
        `${code.split(/-/g)[0].toLowerCase()}${
          code.split(/-/g)[1] ? `-${code.split(/-/g)[1].toLowerCase()}` : ""
        }`
    ) || null
  );
}
