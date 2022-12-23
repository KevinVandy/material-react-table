import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Skeleton, Tab, Tabs } from '@mui/material';

//Locale Examples
const CS_Table = dynamic(() => import('../examples/localization-i18n-cs'), {
  suspense: true,
});
const DE_Table = dynamic(() => import('../examples/localization-i18n-de'), {
  suspense: true,
});
const EN_Table = dynamic(() => import('../examples/localization-i18n-en'), {
  suspense: true,
});
const ES_Table = dynamic(() => import('../examples/localization-i18n-es'), {
  suspense: true,
});
const FA_Table = dynamic(() => import('../examples/localization-i18n-fa'), {
  suspense: true,
});
const FR_Table = dynamic(() => import('../examples/localization-i18n-fr'), {
  suspense: true,
});
const IT_Table = dynamic(() => import('../examples/localization-i18n-it'), {
  suspense: true,
});
const NL_Table = dynamic(() => import('../examples/localization-i18n-nl'), {
  suspense: true,
});
const JA_Table = dynamic(() => import('../examples/localization-i18n-ja'), {
  suspense: true,
});
const PL_Table = dynamic(() => import('../examples/localization-i18n-pl'), {
  suspense: true,
});
const PT_Table = dynamic(() => import('../examples/localization-i18n-pt'), {
  suspense: true,
});
const PT_BR_Table = dynamic(
  () => import('../examples/localization-i18n-pt-BR'),
  {
    suspense: true,
  },
);
const RO_Table = dynamic(() => import('../examples/localization-i18n-ro'), {
  suspense: true,
});
const RU_Table = dynamic(() => import('../examples/localization-i18n-ru'), {
  suspense: true,
});
const TR_Table = dynamic(() => import('../examples/localization-i18n-tr'), {
  suspense: true,
});
const VI_Table = dynamic(() => import('../examples/localization-i18n-vi'), {
  suspense: true,
});
const ZH_HANS_Table = dynamic( () => import('../examples/localization-i18n-zh-hans'), {
  suspense: true,
});
const ZH_HANT_Table = dynamic( () => import('../examples/localization-i18n-zh-hant'), {
  suspense: true,
});

const supportedLocales = [
  'cs',
  'de',
  'en',
  'es',
  'fa',
  'fr',
  'it',
  'ja',
  'nl',
  'pl',
  'pt',
  'pt-BR',
  'ro',
  'ru',
  'tr',
  'vi',
  'zh-hans',
  'zh-hant',
];

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
            <Tab
              label={locale}
              key={locale}
              value={locale}
              sx={{ width: '2rem' }}
            />
          ))}
        </Tabs>
      </Box>
      <div style={{ minHeight: '1500px' }} lang={currentLocale}>
        <Suspense
          fallback={<Skeleton animation="wave" height="600px" width="100%" />}
        >
          {currentLocale === 'cs' && <CS_Table />}
          {currentLocale === 'de' && <DE_Table />}
          {currentLocale === 'en' && <EN_Table />}
          {currentLocale === 'es' && <ES_Table />}
          {currentLocale === 'fa' && <FA_Table />}
          {currentLocale === 'fr' && <FR_Table />}
          {currentLocale === 'it' && <IT_Table />}
          {currentLocale === 'ja' && <JA_Table />}
          {currentLocale === 'nl' && <NL_Table />}
          {currentLocale === 'pl' && <PL_Table />}
          {currentLocale === 'pt' && <PT_Table />}
          {currentLocale === 'pt-BR' && <PT_BR_Table />}
          {currentLocale === 'ro' && <RO_Table />}
          {currentLocale === 'ru' && <RU_Table />}
          {currentLocale === 'tr' && <TR_Table />}
          {currentLocale === 'vi' && <VI_Table />}
          {currentLocale === 'zh-hans' && <ZH_HANS_Table />}
          {currentLocale === 'zh-hant' && <ZH_HANT_Table />}
        </Suspense>
      </div>
    </>
  );
};

export default LocaleExamples;
