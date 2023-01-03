"use strict";

import * as asma from "@asmagin/google-translate-api";
import * as imli from "@imlinhanchao/google-translate-api";
import * as iuse from "@iuser/google-translate-api";
import * as plai from "@plainheart/google-translate-api";
import * as gtae from "google-translate-api-extend";
import * as gtan from "google-translate-api-next";

/**
 * A function that will return a list of languages.
 * @returns 
 */
export default function getLanguages() {
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
            } catch { }

            try {
                Object.defineProperty(languagesByName, name, {
                    value: code,
                    writable: false,
                    enumerable: true,
                });
            } catch { }
        });
    });

    return {
        languagesByCode,
        languagesByName,
        languages: Object.keys(languagesByName),
    };
}