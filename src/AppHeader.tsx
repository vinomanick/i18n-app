import { ChangeEvent } from 'react';
import { useTranslation } from './translations';

export const AppHeader = () => {
  const { setLocale, locale } = useTranslation();
  return (
    <select
      value={locale}
      onChange={(event: ChangeEvent<HTMLSelectElement>) =>
        setLocale(event.target.value)
      }
    >
      <option value="en">English</option>
      <option value="fr">French</option>
    </select>
  );
};
