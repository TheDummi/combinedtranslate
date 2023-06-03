// @ts-ignore
import transAsm from "@asmagin/google-translate-api";
// @ts-ignore
import transIml from "@imlinhanchao/google-translate-api";
// @ts-ignore
import * as transIus from "@iuser/google-translate-api";
// @ts-ignore
import transLei from "@leizl/google-translate-open-api";
// @ts-ignore
import * as transVit from "@vitalets/google-translate-api";
// @ts-ignore
import * as transFan from "fanyi-google";
// @ts-ignore
import transApi from "google-translate-api";
// @ts-ignore
import transNex from "google-translate-api-next";
// @ts-ignore
import * as transApx from "google-translate-api-x";
// @ts-ignore
import * as transOtr from "open-translate";
// @ts-ignore
import * as transEap from "trgoogleapi";
// @ts-ignore
import * as transExt from "google-translate-api-extend";

import getLanguage from "../functions/getLanguage.js";

const trans = [
  transAsm,
  transIml,
  transApi,
  transExt,
  transIus,
  transEap,
  transApx,
  transVit,
  transNex,
  transOtr,
  transFan,
  transLei,
];

type TranslateOptions = {
  target?: string;
  source?: string;
  raw?: boolean;
};

type TranslateResponse = {
  content: string | null;
  pronunciation: string | null;
  translated: boolean | null;
  startTimestamp: number;
  endTimestamp: number;
  totalTime: number | null;
  retries: number;
  language: {
    source: {
      name: string | null;
      code: string | null;
    };
    target: {
      name: string | null;
      code: string | null;
    };
    corrected: boolean | null;
    certainty: number | null;
  };
  text: {
    input: string | null;
    output: string | null;
    corrected: boolean | null;
    value: null | null;
  };
  raw?: null | Record<string, any>;
};

export default async function translate(
  text: string,
  options: TranslateOptions = {}
) {
  if (!options.target) options.target = "en";

  const lang = getLanguage(options.target);

  const translation: TranslateResponse = {
    content: null,
    pronunciation: null,
    translated: false,
    startTimestamp: Number(Date.now()),
    endTimestamp: Number(Date.now()),
    totalTime: 0,
    retries: 0,
    language: {
      source: {
        name: null,
        code: null,
      },
      target: {
        name: lang?.name || null,
        code: lang?.code || null,
      },
      corrected: null,
      certainty: null,
    },
    text: {
      input: null,
      output: null,
      corrected: null,
      value: null,
    },
  };

  if (!lang || !lang.translate) return translation;

  for (const language of Object.values(lang).filter(
    (l) => typeof l == "string"
  )) {
    const config = { to: language };

    for (const translate of trans) {
      translation.retries++;

      try {
        translation.raw = await (translate as Function)(text, config);
        break;
      } catch {}
      try {
        translation.raw = await (
          translate as Record<string, Function>
        ).translate(text, config);
        break;
      } catch {}
      try {
        translation.raw = await (translate as Record<string, Function>).default(
          text,
          config
        );
        break;
      } catch {}
      try {
        translation.raw = await (
          translate as unknown as Record<string, Record<string, Function>>
        ).default.translate(text, config);
        break;
      } catch {}
      try {
        translation.raw = await (
          translate as unknown as Record<string, Record<string, Function>>
        ).default.default(text, config);
        break;
      } catch {}
    }

    translation.content = translation.raw?.text || null;

    translation.pronunciation = translation.raw?.pronunciation || null;

    translation.translated = !!translation.content;

    translation.endTimestamp = Number(Date.now());

    translation.totalTime =
      translation.endTimestamp - translation.startTimestamp;

    translation.language = {
      source: {
        name: getLanguage(translation.raw?.from?.language?.iso)?.name || null,
        code: getLanguage(translation.raw?.from?.language?.iso)?.code || null,
      },
      target: {
        name: getLanguage(options.target)?.name || null,
        code: getLanguage(options.target)?.code || null,
      },
      corrected: translation.raw?.from?.language?.didYouMean,
      certainty:
        Math.round(
          translation.raw?.raw
            ?.at(1)
            ?.filter((e: number) => typeof e === "number")
            ?.at(0) * 10000
        ) / 100 || null,
    };

    translation.text = {
      input: text,
      output: translation.content,
      corrected: translation.language.corrected,
      value: null,
    };

    if (!options.raw) return translation;
    else {
      delete translation.raw;

      return translation;
    }
  }
}
