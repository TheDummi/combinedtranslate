import translate from "./translate.js";

export default async function detect(text: string) {
  return (await translate(text))?.language?.source;
}
