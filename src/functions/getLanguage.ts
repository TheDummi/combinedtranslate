"use strict";

import getLanguageByCode from "./getLanguageByCode.js";
import getLanguageByName from "./getLanguageByName.js";

/**
 * A function to find both the name and ISO code of a language by either of the language
 * @param {string} query - The language name or ISO code 
 * @returns An object containing both language name and ISO code
 */
export default function getLanguage(query: string) {
    if (typeof query !== "string") throw new Error("Can't find language by non-string values.")

    let language = getLanguageByCode(query), code = getLanguageByName(query);

    if (!language) language = getLanguageByCode((code as string));

    if (!code) code = getLanguageByName((language as string));

    return { language, code }
}