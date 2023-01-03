"use strict";

import asma from "@asmagin/google-translate-api";
import imli from "@imlinhanchao/google-translate-api";
import iuse from "@iuser/google-translate-api";
import leiz from "@leizl/google-translate-open-api";
import plai from "@plainheart/google-translate-api";
import vita from "@vitalets/google-translate-api";
import gtae from "google-translate-api-extend";
import gtan from "google-translate-api-next";
import gtax from "google-translate-api-x";
import gtoa from "google-translate-open-api";
import trga from "trgoogleapi";
import * as main from "../main.js";

interface Options {
	to?: string;
	from?: string | null;
	logOnFail?: boolean;
}
/**
 * 
 * @param {string} text - A string value with any characters up to 5000 at once 
 * @param {Options} options - A set of optional options 
 * @returns an object containing translation, source and target language and much more.
 */
export default async function translate(text: string, options: Options = {}) {
	const start: number = Number(Date.now());

	if (!options.to) options.to = "English";

	if (typeof text !== "string") throw new Error("Can't translate non-string values.")

	const target = getCredentials(options.to);
	const from = getCredentials(options.from as string | null);

	let response,
		tries = 0;

	for (const translate of [asma, gtan, iuse, imli, gtae, plai]) {
		for (const to of target) {
			if (!to) break;

			let translated;

			if (!from[0] && !from[1]) {
				try {
					translated = await translate(text, { to });
				} catch { }
			} else {
				try {
					translated = await translate(text, {
						to,
						from: from[target.indexOf(to)] as string,
					});
				} catch { }
			}
			if (translated?.text) {
				response = translated;

				break;
			} else {
				tries++;
				if (options.logOnFail) console.log(`[${tries}] Failed to translate with "${to}".`);
				continue;
			}
		}

		if (response) break;
		else continue;
	}

	for (const translator of [leiz, gtax, gtoa, trga]) {
		for (const to of target) {
			if (!to) break;

			let translated;

			if (!from[0] && !from[1]) {
				try {
					translated = await translator.default(text, { to });
				} catch { }
			} else {
				translated = await translator.default(text, {
					to,
					from: from[target.indexOf(to)] as string,
				});
			}
			if (translated?.text) {
				response = translated;

				break;
			} else {
				tries++;
				if (options.logOnFail) console.log(`[${tries}] Failed to translate with "${to}".`);
				continue;
			}
		}

		if (response) break;
		else continue;
	}

	for (const to of target) {
		if (!to) break;

		let translated;

		if (!from[0] && !from[1]) {
			try {
				translated = await vita.translate(text, { to });
			} catch { }
		} else {
			translated = await vita.translate(text, {
				to,
				from: from[target.indexOf(to)] as string,
			});
		}
		if (translated?.text) {
			response = translated;

			break;
		} else {
			tries++;
			if (options.logOnFail) console.log(`[${tries}] Failed to translate with "${to}".`);
			continue;
		}
	}

	return {
		content: response?.text || text,
		pronunciation: response?.pronunciation || null,
		translated: !!response?.text,
		tries: tries,
		time: Number(Date.now()) - start,
		language: {
			source: {
				name: main.languagesByCode[response?.from?.language?.iso || response?.raw?.src || ""] || null,
				code: response?.from?.language?.iso || response?.raw?.src || null,
			},
			target: {
				name: target[1],
				code: target[0],
			},
			corrected: response?.from?.language?.didYouMean || false,
			certainty: response?.raw?.confidence || null,
		},
		text: {
			input: text,
			output: response?.text || text,
			corrected: response?.from?.text?.autoCorrected || false,
			value: response?.from?.text?.value || null,
		},
		raw: response?.raw || null,
	} as const;
}

function getCredentials(language: string | null) {
	let code, name;

	if (language)
		code =
			main.languagesByName[language.charAt(0).toUpperCase() + language.slice(1).toLowerCase()];

	if (language)
		name =
			main.languagesByCode[
			`${language.split(/-/g)[0].toLowerCase()}${language.split(/-/g)[1]
				? `-${language.split(/-/g)[1].toUpperCase()}`
				: ""
			}`
			];

	if (!code && name) code = main.languagesByName[name];

	if (!name && code) name = main.languagesByCode[code];

	return [code || null, name || null];
}
