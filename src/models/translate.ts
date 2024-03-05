/** @format */

// @ts-expect-error
import trans02 from 'google-translate-api-plus';
// @ts-expect-error
import trans03 from 'limitless-google-translate';
// @ts-expect-error
import trans04 from '@34r7h/google-translate-api';
import trans05 from '@opentranslate/google';
import trans06 from 'baidu-translate-api';
// @ts-expect-error
import trans07 from 'granslate';
// @ts-expect-error
import trans08 from 'google-translate-api-extended';
// @ts-expect-error
import trans09 from 'google-translate-free';
// @ts-expect-error
import trans10 from '@f97/google-translate-api';
import * as trans12 from 'chatgpt-translate';
// @ts-expect-error
import trans13 from '@iamthes/google-translate';
// @ts-expect-error
import trans14 from 'translation-google';
import trans15 from '@leizl/google-translate-open-api';
// @ts-expect-error
import trans16 from 'open-translate';
// @ts-expect-error
import trans18 from 'google-translate-api-fix';
import trans19 from '@iamtraction/google-translate';
import trans20 from '@asmagin/google-translate-api';
import trans21 from 'google-translate-api-x';
import trans22 from 'trgoogleapi';
import trans23 from '@imlinhanchao/google-translate-api';
import trans26 from 'fanyi-google';
import trans28 from 'google-translate-api-extend';
// @ts-expect-error
import trans29 from '@anmoti/translateapi';
import trans31 from 'google-translate-api-next';
import trans33 from '@iuser/google-translate-api';
// @ts-expect-error
import trans34 from 'translatte';
import trans35 from '@vitalets/google-translate-api';

import getLanguage from '../functions/getLanguage.js';

const trans = [
	trans03,
	trans04,
	trans05,
	trans06,
	trans07,
	trans08,
	trans09,
	trans10,
	trans12,
	trans13,
	trans14,
	trans15,
	trans16,
	trans18,
	trans19,
	trans20,
	trans21,
	trans22,
	trans23,
	trans26,
	trans28,
	trans29,
	trans31,
	trans33,
	trans34,
	trans35,
	trans02,
];

type TranslateOptions = {
	target?: string;
	to?: string;
	source?: string;
	from?: string;
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

export default async function translate(text: string, options: TranslateOptions = {}) {
	if (!options.target) options.target = 'en';

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

	for (const language of Object.values(lang).filter((l) => typeof l == 'string')) {
		const config = { to: language, target: language, from: options.from || 'auto' };

		for (const translate of trans) {
			translation.retries++;

			try {
				translation.raw = await translate(text, config);

				if (translation.raw) break;
			} catch {}
			try {
				translation.raw = await translate.translate(text, config);
				if (translation.raw) break;
			} catch {}
			try {
				translation.raw = await translate.default(text, config);
				if (translation.raw) break;
			} catch {}
			try {
				translation.raw = await translate.default.translate(text, config);
				if (translation.raw) break;
			} catch {}
			try {
				translation.raw = await translate.default.default(text, config);
				if (translation.raw) break;
			} catch {}
		}

		translation.content = translation.raw?.text || null;

		translation.pronunciation = translation.raw?.pronunciation || null;

		translation.translated = !!translation.content;

		translation.endTimestamp = Number(Date.now());

		translation.totalTime = translation.endTimestamp - translation.startTimestamp;

		translation.language = {
			source: {
				name: getLanguage(translation.raw?.from?.language?.iso || translation?.raw?.raw?.src)?.name || null,
				code: getLanguage(translation.raw?.from?.language?.iso || translation?.raw?.raw?.src)?.code || null,
			},
			target: {
				name: getLanguage(options.target)?.name || null,
				code: getLanguage(options.target)?.code || null,
			},
			corrected: translation.raw?.from?.language?.didYouMean || null,
			certainty: Math.round(translation.raw?.raw?.[0]?.filter((e: number) => typeof e === 'number')?.[0] || translation.raw?.raw?.confidence * 10000) / 100 || null,
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
