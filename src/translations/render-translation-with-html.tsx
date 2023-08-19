import { TranslateParams } from './translations.interfaces';
import { useTranslation } from './use-translation';

export const RenderTranslationWithHtml = ({
  tKey,
  params,
  className,
}: {
  tKey: string;
  params?: TranslateParams;
  className?: string;
}) => {
  const { t } = useTranslation();

  const htmlString = t(tKey, params, { escapeValue: false });

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{
        __html: htmlString,
      }}
    />
  );
};
