/** @format */

import languages from '../tools/languages.js';

/**
 * A function to get the language name by it's ISO code
 * @param {string} lang - The ISO lang of the language
 * @returns language name
 */
export default function getLanguageByName(language: string) {
	if (typeof language !== 'string') return null;

	return languages.find((l) => l.name?.toLowerCase() === language.toLowerCase()) || null;
}
