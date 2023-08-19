import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Translations } from './translations';
import { TRANSLATIONS_MAPPING } from './locales/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Translations
      defaultLocale="en"
      initLocale="en"
      translationsMap={TRANSLATIONS_MAPPING}
    >
      <App />
    </Translations>
  </React.StrictMode>
);
