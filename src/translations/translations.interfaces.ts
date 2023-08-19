/* eslint-disable @typescript-eslint/no-explicit-any */

export interface TranslationsObject {
  [key: string]: any;
}

export interface TranslationsMap {
  [x: string]: () => Promise<TranslationsObject>;
}

export interface TranslateParams {
  count?: number;
  [key: string]: any;
}

export interface TranslateOptions {
  escapeValue?: boolean;
}
