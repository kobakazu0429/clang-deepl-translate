import axios from "axios";

// type definitions
// https://github.com/funkyremi/deepl
export type SourceLang =
  | "BG" // - Bulgarian
  | "CS" // - Czech
  | "DA" // - Danish
  | "DE" // - German
  | "EL" // - Greek
  | "EN" // - English
  | "ES" // - Spanish
  | "ET" // - Estonian
  | "FI" // - Finnish
  | "FR" // - French
  | "HU" // - Hungarian
  | "IT" // - Italian
  | "JA" // - Japanese
  | "LT" // - Lithuanian
  | "LV" // - Latvian
  | "NL" // - Dutch
  | "PL" // - Polish
  | "PT" // - Portuguese (all Portuguese varieties mixed)
  | "RO" // - Romanian
  | "RU" // - Russian
  | "SK" // - Slovak
  | "SL" // - Slovenian
  | "SV" // - Swedish
  | "ZH"; // - Chinese

export type TargetLang =
  | SourceLang
  | "EN-GB" // - English (British)
  | "EN-US" // - English (American)
  | "EN" // - English (unspecified variant for backward compatibility; please select EN-GB or EN-US instead)
  | "PT-PT" // - Portuguese (all Portuguese varieties excluding Brazilian Portuguese)
  | "PT-BR" // - Portuguese (Brazilian)
  | "PT"; // - Portuguese (unspecified variant for backward compatibility; please select PT-PT or PT-BR instead)

export interface Parameters {
  free_api: Boolean;
  auth_key: string;
  text: string;
  source_lang?: SourceLang;
  target_lang: TargetLang;
  split_sentences?: "0" | "1" | "nonewlines";
  preserve_formatting?: "0" | "1";
  formality?: "default" | "more" | "less";
  tag_handling?: string[];
  non_splitting_tags?: string[];
  outline_detection?: string;
  splitting_tags?: string[];
  ignore_tags?: string[];
}

export interface Response {
  translations: {
    detected_source_language: string;
    text: string;
  }[];
}

export const deepl = ({ free_api, auth_key, ...params }: Parameters) => {
  const sub_domain = free_api ? "api-free" : "api";
  const url = `https://${sub_domain}.deepl.com/v2/translate`;

  return axios.get<Response>(url, {
    headers: {
      Authorization: `DeepL-Auth-Key ${auth_key}`,
    },
    params,
  });
};
