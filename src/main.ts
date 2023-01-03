"use strict";

import translate from "./functions/translate.js";
import getLanguages from "./functions/getLanguages.js";
import getLanguageByName from "./functions/getLanguageByName.js"
import getLanguageByCode from "./functions/getLanguageByCode.js";
import getLanguage from "./functions/getLanguage.js";

const languagesByCode = getLanguages().languagesByCode,
	languagesByName = getLanguages().languagesByName,
	languagesList = getLanguages().languages;

export {
	// Constants
	languagesByCode,
	languagesByName,
	languagesList,

	// Functions
	translate,
	getLanguageByCode,
	getLanguageByName,
	getLanguage
};

export default translate;
