import * as asma from "@asmagin/google-translate-api";
import * as imli from "@imlinhanchao/google-translate-api";
import * as iuse from "@iuser/google-translate-api";
import * as leiz from "@leizl/google-translate-open-api";
import * as plai from "@plainheart/google-translate-api";
import * as vita from "@vitalets/google-translate-api";
import * as gtae from "google-translate-api-extend";
import * as gtan from "google-translate-api-next";
import * as gtax from "google-translate-api-x";
import * as gtoa from "google-translate-open-api";
import * as gotr from "googletrans";
import * as trga from "trgoogleapi";
import translate from "./Translate.js";

function getLanguages() {
	const languagesByCode: Record<string, string> = {
			zh: "Chinese",
			"zh-cn": "Chinese Simplified",
			"zh-tw": "Chinese Traditional",
			ma: "Mandarin",
		},
		languagesByName: Record<string, string> = {
			Chinese: "zh",
			"Chinese Simplified": "zh-cn",
			"Chinese Traditional": "zh-tw",
			Mandarin: "ma",
		};

	[
		asma.languages,
		imli.languages,
		iuse.languages,
		plai.languages,
		gtae.languages,
		gtan.languages,
	].map((language) => {
		Object.entries(language).map(([code, name]) => {
			if (typeof name === "function") return;

			try {
				Object.defineProperty(languagesByCode, code, {
					value: name,
					writable: false,
					enumerable: true,
				});
			} catch {}

			try {
				Object.defineProperty(languagesByName, name, {
					value: code,
					writable: false,
					enumerable: true,
				});
			} catch {}
		});
	});

	return {
		languagesByCode,
		languagesByName,
		languages: Object.keys(languagesByName),
	};
}

const languagesByCode = getLanguages().languagesByCode,
	languagesByName = getLanguages().languagesByName,
	languagesList = getLanguages().languages;

export { languagesByCode, languagesByName, languagesList, translate };

export default translate;
