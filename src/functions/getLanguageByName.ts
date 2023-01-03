"use strict";

import getLanguages from "./getLanguages.js";

/**
 * A function to get the ISO code by it's language name
 * @param {string} language - the language name 
 * @returns language ISO
 */
export default function getLanguageByName(language: string) {
    if (typeof language !== "string") throw new Error("Can't find language by non-string values.")

    return getLanguages().languagesByName[(language.charAt(0).toUpperCase() + language.slice(1).toLowerCase())] || null;
}