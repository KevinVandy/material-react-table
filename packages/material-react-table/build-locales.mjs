import typescript from '@rollup/plugin-typescript';
import { rollup } from 'rollup';
import copy from 'rollup-plugin-copy';

const supportedLocales = [
  'ar',
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

async function build(locale) {
  const bundle = await rollup({
    input: `./src/locales/${locale}.ts`,
    plugins: [
      typescript({
        declaration: false,
        declarationDir: undefined,
        rootDir: './src',
      }),
      copy({
        targets: [
          ...['cjs', 'esm'].map((format) => ({
            dest: './locales',
            rename: () =>
              format === 'esm' ? `${locale}.${format}.d.ts` : `${locale}.d.ts`,
            src: `./dist/esm/types/locales/${locale}.d.ts`,
          })),
        ],
      }),
    ],
  });

  await bundle.write({
    file: `./locales/${locale}.js`,
    format: 'cjs',
    sourcemap: true,
  });

  await bundle.write({
    file: `./locales/${locale}.esm.js`,
    format: 'esm',
    sourcemap: true,
  });

  // eslint-disable-next-line
  console.log(`Built ${locale} locale`);
}

async function run() {
  for (const locale of supportedLocales) {
    await build(locale);
  }
}

// eslint-disable-next-line
run().catch((error) => console.error(error));
