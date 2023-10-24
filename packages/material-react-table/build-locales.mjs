/* eslint-disable */
import pkg from './package.json' assert { type: 'json' };
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';
import { rollup } from 'rollup';

const supportedLocales = [
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
    file: `./locales/${locale}.js`,
    format: 'cjs',
    sourcemap: false,
  });

  await bundle.write({
    file: `./locales/${locale}.mjs`,
    format: 'esm',
    sourcemap: false,
  });

  const typeFile = `import { type MRT_Localization } from '..';
export declare const MRT_Localization_${locale
    .toUpperCase()
    .replaceAll('-', '_')}: MRT_Localization;
  `;

  await fs.writeFile(`./locales/${locale}.d.ts`, typeFile, (err) => {
    if (err) console.log(err);
  });

  console.log(`Built ${locale} locale`);
}

async function run() {
  for (const locale of supportedLocales) {
    await build(locale);
  }
  pkg.exports = {
    ...pkg.exports,
    ...supportedLocales.reduce((acc, locale) => {
      acc[`./locales/${locale}`] = {
        import: `./locales/${locale}.mjs`,
        default: `./locales/${locale}.js`,
        types: `./locales/${locale}.d.ts`,
      };
      return acc;
    }, {}),
  };
  await fs.writeFile('./package.json', JSON.stringify(pkg, null, 2), (err) => {
    if (err) console.log(err);
  });
}

run().catch((error) => console.error(error));
