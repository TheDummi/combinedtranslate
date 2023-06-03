// @ts-ignore
import pig from "pig-latin";

export default function pigify(content: string) {
  if (!content) throw new Error(`No content to translate!`);

  return pig(content);
}
