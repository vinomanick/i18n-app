/* eslint-disable @typescript-eslint/no-explicit-any */
import { TranslateOptions, TranslateParams } from './translations.interfaces';

const ESCAPE_KEYS: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
};

const hasOwnProperty = (data: any, property: string) =>
  data &&
  typeof data === 'object' &&
  Object.prototype.hasOwnProperty.call(data, property);

const getPlural = (count: number, locale: string) => {
  if (typeof Intl == 'object' && typeof Intl.PluralRules == 'function') {
    return new Intl.PluralRules(locale).select(count);
  }
  return count === 0 ? 'zero' : count === 1 ? 'one' : 'other';
};

export const translate = (
  translations: Record<string, any> = {},
  locale: string,
  key: string,
  params: TranslateParams = {},
  options: TranslateOptions = { escapeValue: true }
): string => {
  let result: any = translations;
  let currentKey = key;

  const { count } = params;
  if (hasOwnProperty(params, 'count') && typeof count === 'number') {
    const plural = getPlural(count, locale);
    if (count === 0) {
      currentKey += '.zero';
    } else if (plural === 'other') {
      currentKey += '.many';
    } else {
      currentKey += `.${plural}`;
    }
  }

  currentKey.split('.').forEach((k: string) => {
    if (result[k]) {
      result = result[k];
    }
  });

  if (typeof result !== 'string') {
    console.warn(`Missing translation for ${key}`);
    return '';
  }

  const getParamValue = (paramKey: string) => {
    console.log(paramKey, params);
    const value = params[paramKey];
    return options.escapeValue && typeof options === 'string'
      ? value.replace(/[&<>"'\\/]/g, (key: string) => ESCAPE_KEYS[key])
      : value;
  };

  return Object.keys(params).length
    ? result.replace(/\${(.+?)\}/gm, (_, varName) => getParamValue(varName))
    : result;
};
