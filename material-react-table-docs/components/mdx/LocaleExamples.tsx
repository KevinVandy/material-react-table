import React, { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Skeleton, Tab, Tabs } from '@mui/material';

//Locale Examples
const PT_BR_Table = dynamic(
  () => import('../../examples/localization-i18n-pt-BR'),
  {
    ssr: false,
  },
);
const ES_Table = dynamic(() => import('../../examples/localization-i18n-es'), {
  ssr: false,
});

const supportedLocales = ['es', 'pt-BR'];

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
      {typeof window !== 'undefined' && (
        <div lang={currentLocale}>
          <Suspense fallback={<Skeleton height="500px" width="100%" />}>
            {currentLocale === 'en' && <></>}
            {currentLocale === 'pt-BR' && <PT_BR_Table />}
            {currentLocale === 'es' && <ES_Table />}
          </Suspense>
        </div>
      )}
    </>
  );
};

export default LocaleExamples;
