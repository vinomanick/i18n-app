/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useState } from 'react';
import { TranslationsContext } from './translations-context';
import { TranslationsMap } from './translations.interfaces';
import { getTranslations } from './translations-fetch.util';

interface TranslationsProps {
  children: ReactNode;
  defaultLocale: string;
  initLocale?: string;
  translationsMap?: TranslationsMap;
}

export const Translations = ({
  children,
  defaultLocale,
  initLocale = '',
  translationsMap,
}: TranslationsProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [locale, setLocale] = useState(initLocale);
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    if (locale) {
      setIsLoading(true);
      getTranslations({ translationsMap, locale, defaultLocale }).then(
        (response) => {
          setTranslations(response);
          setIsLoading(false);
        }
      );
    }
  }, [defaultLocale, locale, translationsMap]);

  return (
    <TranslationsContext.Provider
      value={{ locale, setLocale, isLoading, translations, defaultLocale }}
    >
      {children}
    </TranslationsContext.Provider>
  );
};
