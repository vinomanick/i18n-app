import { createContext } from 'react';
import { TranslationsObject } from './translations.interfaces';

interface TContext {
  locale: string;
  isLoading: boolean;
  setLocale: (language: string) => void;
  translations: TranslationsObject;
  defaultLocale: string;
}

export const TranslationsContext = createContext<TContext>({
  locale: '',
  isLoading: true,
  setLocale: () => null,
  translations: {},
  defaultLocale: '',
});
