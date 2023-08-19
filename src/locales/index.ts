/* eslint-disable @typescript-eslint/no-explicit-any */
export const TRANSLATIONS_MAPPING: Record<string, () => Promise<any>> = {
  en: () => import('./en.json'),
  fr: () => import('./fr.json'),
};
