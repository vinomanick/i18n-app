import { useContext } from 'react';
import { TranslationsContext } from './translations-context';
import { TranslateOptions, TranslateParams } from './translations.interfaces';
import { translate } from './translate-helper.util';

type THelper = (
  key: string,
  params?: TranslateParams,
  options?: TranslateOptions
) => string;

export interface UseTranslation {
  isLoading: boolean;
  locale: string;
  setLocale: (language: string) => void;
  t: THelper;
}

export const useTranslation = (): UseTranslation => {
  const { setLocale, isLoading, translations, locale } =
    useContext(TranslationsContext);

  return {
    isLoading,
    locale,
    setLocale,
    t: (key, params = {}, options) =>
      translate(translations, locale, key, params, options),
  };
};
