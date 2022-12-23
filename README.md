# CombinedTranslate \[BETA\]

A package that has multiple translation API's and packages to return an assured response.

## Install

```md
npm i combinedtranslate
```

**Note:** It will show a bunch of security issues, this has to do with packages using unmaintained versions of fetch API's, like got.

## How to Use

Using the package is very easy.

```js
import translate from "combinedtranslate";

const translation = await translate("Hallo Wereld", { to: "English" });
// Output: translation.content = 'Hello World'
```

### Output

```js
{
  content: string, // The content of the translation
  pronunciation: string | null, // If applied, it'll provide a phonetic script.
  translated: boolean,
  tries: number, // Number of times it switched API's to get the current response.
  language: {
    source: { // The language translating from
        name: string | null, // The name of the language (null when not provided.)
         code: string | null // The ISO code of the language (null when not provided.)
        },
    target: { // The language you're translating to
        name: string, // The name of the target language
         code: string // The ISO code of the target language
        },
    corrected: boolean, // Whether autocorrect on language was used
    certainty: number | null // The percentage of how certain the translator is (null when not provided)
  },
  text: {
    input: string, // The string given on input
    output: string, // The string returned as output or the content
    corrected: boolean, // Whether autocorrect was used on the string
    value: null // No idea what this is...
  },
  raw: {
    // The data without it being formatted nicely
  }
}
```

### Translate Options

| name      | type    | default | description                            |
| --------- | ------- | ------- | -------------------------------------- |
| to        | string  | English | language to translate to               |
| from      | string  | null    | language to translate from             |
| logOnFail | boolean | false   | Whether to log every time an API fails |

### Methods

```js
import translate, {
	languagesByCode,
	languagesByName,
	languageList,
} from "combinedtranslate";

languagesByCode; // An object with all supported languages by their ISO code.

languagesByName; // An object with all supported languages by their name.

languagesList; // An array of all the languages just by name.
```

## Notes

- Only compatible with ESM
- TypeScript and JavaScript support
