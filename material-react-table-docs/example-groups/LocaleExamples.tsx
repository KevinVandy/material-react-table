import React, { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Skeleton, Tab, Tabs } from '@mui/material';

//Locale Examples
const CS_Table = dynamic(() => import('../examples/localization-i18n-cs'), {
  suspense: true,
});
const DE_Table = dynamic(() => import('../examples/localization-i18n-de'), {
  suspense: true,
});
const ES_Table = dynamic(() => import('../examples/localization-i18n-es'), {
  suspense: true,
});
const JA_Table = dynamic(() => import('../examples/localization-i18n-ja'), {
  suspense: true,
});
const PL_Table = dynamic(() => import('../examples/localization-i18n-pl'), {
  suspense: true,
});
const PT_BR_Table = dynamic(
  () => import('../examples/localization-i18n-pt-BR'),
  {
    suspense: true,
  },
);
const RU_Table = dynamic(() => import('../examples/localization-i18n-ru'), {
  suspense: true,
});

const supportedLocales = ['cs', 'de', 'es', 'ja', 'pl', 'pt-BR', 'ru'];

const LocaleExamples = () => {
  const [currentLocale, setCurrentLocale] = useState('es');

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          onChange={(_event, newValue: string) => setCurrentLocale(newValue)}
          scrollButtons="auto"
          value={currentLocale}
          variant="scrollable"
        >
          {supportedLocales.map((locale) => (
            <Tab label={locale} key={locale} value={locale} />
          ))}
        </Tabs>
      </Box>
      <div style={{ minHeight: '1500px' }} lang={currentLocale}>
        <Suspense
          fallback={<Skeleton animation="wave" height="600px" width="100%" />}
        >
          {currentLocale === 'cs' && <CS_Table />}
          {currentLocale === 'de' && <DE_Table />}
          {currentLocale === 'es' && <ES_Table />}
          {currentLocale === 'ja' && <JA_Table />}
          {currentLocale === 'pl' && <PL_Table />}
          {currentLocale === 'pt-BR' && <PT_BR_Table />}
          {currentLocale === 'ru' && <RU_Table />}
        </Suspense>
      </div>
    </>
  );
};

export default LocaleExamples;
