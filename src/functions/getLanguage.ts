/** @format */

import getLanguageByCode from './getLanguageByCode.js';
import getLanguageByName from './getLanguageByName.js';

export default function getLanguage(query: string) {
	return getLanguageByCode(query) || getLanguageByName(query);
}
