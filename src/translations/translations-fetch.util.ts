/* eslint-disable @typescript-eslint/no-explicit-any */
import { TranslationsMap } from './translations.interfaces';

const isObject = (data: any) => data && typeof data === 'object';

const mergeDeep = (
  target: Record<string, any>,
  ...sources: Record<string, any>[]
): Record<string, any> => {
  if (!sources.length) return target;
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} });
        }
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, {
          [key]: source[key],
        });
      }
    }
  }
  return mergeDeep(target, ...sources);
};

export const getTranslations = ({
  translationsMap = { en: () => Promise.resolve({}) },
  locale,
  defaultLocale,
}: {
  translationsMap?: TranslationsMap;
  locale: string;
  defaultLocale: string;
}) => {
  if (locale === defaultLocale || !translationsMap[locale]) {
    return translationsMap[defaultLocale]();
  }

  return Promise.all([
    translationsMap[defaultLocale](),
    translationsMap[locale](),
  ]).then(([defaultTranslations, userLocaleTranslations]) =>
    mergeDeep({}, defaultTranslations, userLocaleTranslations)
  );
};
