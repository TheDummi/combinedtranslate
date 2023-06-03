// @ts-ignore
import { translate as emotesToText } from "translate-emoji";
// @ts-ignore
import { translate as textToEmotes } from "moji-translate";

export default function emojify(content: string) {
  if (!content) throw new Error(`No content to translate!`);

  if (!!content.match(/[A-z]/)) return textToEmotes(content);
  else return emotesToText(content).replace(/\(|\)/gim, "");
}
