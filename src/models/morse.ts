// @ts-ignore
import { textToMorse, morseToText } from "morcedecoder";

export default function morse(content: string) {
  if (!content) throw new Error(`No content to translate!`);

  if (!!content.match(/[A-z]/)) return textToMorse(content);
  else return morseToText(content);
}
