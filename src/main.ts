/** @format */

import emojify from "./models/emojify.js";
import morse from "./models/morse.js";
import pigify from "./models/pigify.js";
import convert from "convert-units";
import translate from "./models/translate.js";
import detect from "./models/detect.js";
import getLanguageByCode from "./functions/getLanguageByCode.js";
import getLanguageByName from "./functions/getLanguageByName.js";
import getLanguage from "./functions/getLanguage.js";

import languages from "./tools/languages.js";

export {
  morse,
  pigify,
  emojify,
  convert,
  translate,
  detect,
  languages,
  getLanguageByCode,
  getLanguageByName,
  getLanguage,
};

export default translate;
