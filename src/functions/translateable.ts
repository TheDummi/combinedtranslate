/** @format */

import getLanguage from "./getLanguage.js";

export default function translateable(language: string) {
  const lang = getLanguage(language);

  return lang?.translate || null;
}
