import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import AM_Table from '../examples/localization-i18n-am';
import AR_Table from '../examples/localization-i18n-ar';
import AZ_Table from '../examples/localization-i18n-az';
import BG_Table from '../examples/localization-i18n-bg';
import CS_Table from '../examples/localization-i18n-cs';
import DA_Table from '../examples/localization-i18n-da';
import DE_Table from '../examples/localization-i18n-de';
import EN_Table from '../examples/localization-i18n-en';
import ES_Table from '../examples/localization-i18n-es';
import ET_Table from '../examples/localization-i18n-et';
import FA_Table from '../examples/localization-i18n-fa';
import FI_Table from '../examples/localization-i18n-fi';
import FR_Table from '../examples/localization-i18n-fr';
import HE_Table from '../examples/localization-i18n-he';
import HU_Table from '../examples/localization-i18n-hu';
import HY_Table from '../examples/localization-i18n-hy';
import ID_Table from '../examples/localization-i18n-id';
import IT_Table from '../examples/localization-i18n-it';
import JA_Table from '../examples/localization-i18n-ja';
import KO_Table from '../examples/localization-i18n-ko';
import NL_Table from '../examples/localization-i18n-nl';
import NO_Table from '../examples/localization-i18n-no';
import NP_Table from '../examples/localization-i18n-np';
import PL_Table from '../examples/localization-i18n-pl';
import PT_BR_Table from '../examples/localization-i18n-pt-BR';
import PT_Table from '../examples/localization-i18n-pt';
import RO_Table from '../examples/localization-i18n-ro';
import RU_Table from '../examples/localization-i18n-ru';
import SK_Table from '../examples/localization-i18n-sk';
import SR_Cyrl_RS_Table from '../examples/localization-i18n-sr-Cyrl-RS';
import SR_Latn_RS_Table from '../examples/localization-i18n-sr-Latn-RS';
import SV_Table from '../examples/localization-i18n-sv';
import TR_Table from '../examples/localization-i18n-tr';
import UK_Table from '../examples/localization-i18n-uk';
import VI_Table from '../examples/localization-i18n-vi';
import ZH_HANS_Table from '../examples/localization-i18n-zh-hans';
import ZH_HANT_Table from '../examples/localization-i18n-zh-hant';

const supportedLocales = [
  'am',
  'ar',
  'az',
  'bg',
  'cs',
  'da',
  'de',
  'en',
  'es',
  'et',
  'fa',
  'fi',
  'fr',
  'he',
  'hu',
  'hy',
  'id',
  'it',
  'ja',
  'ko',
  'nl',
  'no',
  'np',
  'pl',
  'pt',
  'pt-BR',
  'ro',
  'ru',
  'sk',
  'sr-Cyrl-RS',
  'sr-Latn-RS',
  'sv',
  'tr',
  'uk',
  'vi',
  'zh-Hans',
  'zh-Hant',
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
      {currentLocale === 'am' && <AM_Table />}
      {currentLocale === 'ar' && <AR_Table />}
      {currentLocale === 'az' && <AZ_Table />}
      {currentLocale === 'bg' && <BG_Table />}
      {currentLocale === 'cs' && <CS_Table />}
      {currentLocale === 'da' && <DA_Table />}
      {currentLocale === 'de' && <DE_Table />}
      {currentLocale === 'en' && <EN_Table />}
      {currentLocale === 'es' && <ES_Table />}
      {currentLocale === 'et' && <ET_Table />}
      {currentLocale === 'fa' && <FA_Table />}
      {currentLocale === 'fi' && <FI_Table />}
      {currentLocale === 'fr' && <FR_Table />}
      {currentLocale === 'he' && <HE_Table />}
      {currentLocale === 'hu' && <HU_Table />}
      {currentLocale === 'hy' && <HY_Table />}
      {currentLocale === 'id' && <ID_Table />}
      {currentLocale === 'it' && <IT_Table />}
      {currentLocale === 'ja' && <JA_Table />}
      {currentLocale === 'ko' && <KO_Table />}
      {currentLocale === 'nl' && <NL_Table />}
      {currentLocale === 'no' && <NO_Table />}
      {currentLocale === 'np' && <NP_Table />}
      {currentLocale === 'pl' && <PL_Table />}
      {currentLocale === 'pt' && <PT_Table />}
      {currentLocale === 'pt-BR' && <PT_BR_Table />}
      {currentLocale === 'ro' && <RO_Table />}
      {currentLocale === 'ru' && <RU_Table />}
      {currentLocale === 'sk' && <SK_Table />}
      {currentLocale === 'sr-Cyrl-RS' && <SR_Cyrl_RS_Table />}
      {currentLocale === 'sr-Latn-RS' && <SR_Latn_RS_Table />}
      {currentLocale === 'sv' && <SV_Table />}
      {currentLocale === 'tr' && <TR_Table />}
      {currentLocale === 'uk' && <UK_Table />}
      {currentLocale === 'vi' && <VI_Table />}
      {currentLocale === 'zh-Hans' && <ZH_HANS_Table />}
      {currentLocale === 'zh-Hant' && <ZH_HANT_Table />}
    </>
  );
};

export default LocaleExamples;
