import { AppHeader } from './AppHeader';
import { useTranslation } from './translations';

const App = () => {
  const { t, isLoading } = useTranslation();
  return isLoading ? (
    <>Loading...</>
  ) : (
    <>
      <AppHeader />
      <h1>{t('app.heading')}</h1>
    </>
  );
};

export default App;
