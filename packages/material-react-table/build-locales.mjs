/* eslint-disable */
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';
import { rollup } from 'rollup';

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
        sourceMap: false,
      }),
    ],
  });

  await bundle.write({
    file: `./locales/${locale}/index.js`,
    format: 'cjs',
    sourcemap: false,
  });

  await bundle.write({
    file: `./locales/${locale}/index.esm.js`,
    format: 'esm',
    sourcemap: false,
  });

  const typeFile = `import { type MRT_Localization } from '../..';
export declare const MRT_Localization_${locale
    .toUpperCase()
    .replaceAll('-', '_')}: MRT_Localization;
  `;

  await fs.writeFile(`./locales/${locale}/index.d.ts`, typeFile, (err) => {
    if (err) console.log(err);
  });

  await fs.writeFile(`./locales/${locale}/index.esm.d.ts`, typeFile, (err) => {
    if (err) console.log(err);
  });

  await fs.writeFile(
    `./locales/${locale}/package.json`,
    JSON.stringify(
      {
        main: 'index.js',
        module: 'index.esm.js',
        sideEffects: false,
        types: 'index.d.ts',
      },
      null,
      2,
    ),
    (err) => {
      if (err) console.log(err);
    },
  );

  console.log(`Built ${locale} locale`);
}

async function run() {
  for (const locale of supportedLocales) {
    await build(locale);
  }
}

run().catch((error) => console.error(error));
