import languages from "../tools/languages.js";

/**
 * A function to get the language name by it's ISO code
 * @param {string} lang - The ISO lang of the language
 * @returns language name
 */
export default function getLanguageByCode(language: string) {
  if (typeof language !== "string") return null;

  return (
    languages.find(
      (l) =>
        l.name ===
        `${language.split(/-/g)[0].toLowerCase()}${
          language.split(/-/g)[1]
            ? `-${language.split(/-/g)[1].toUpperCase()}`
            : ""
        }`
    ) || null
  );
}
