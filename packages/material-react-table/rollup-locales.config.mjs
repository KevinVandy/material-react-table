import copy from 'rollup-plugin-copy';
import typescript from '@rollup/plugin-typescript';

const supportedLocales = [
  'cs',
  'da',
  'de',
  'en',
  'es',
  'fa',
  'fi',
  'fr',
  'it',
  'ja',
  'nl',
  'pl',
  'pt',
  'pt-BR',
  'ro',
  'ru',
  'sr-Cyrl-RS',
  'sr-Latn-RS',
  'sv',
  'tr',
  'uk',
  'vi',
  'zh-Hans',
  'zh-Hant',
];

export default supportedLocales.map((locale) => ({
  input: `./src/_locales/${locale}.ts`,
  output: [
    {
      file: `./locales/${locale}.js`,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: `./locales/${locale}.esm.js`,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({ declaration: false, declarationDir: undefined }),
    copy({
      targets: [
        ...['cjs', 'esm'].map((format) => ({
          src: `./dist/esm/types/_locales/${locale}.d.ts`,
          dest: './locales',
          rename: () =>
            format === 'esm' ? `${locale}.${format}.d.ts` : `${locale}.d.ts`,
        })),
      ],
    }),
  ],
}));
