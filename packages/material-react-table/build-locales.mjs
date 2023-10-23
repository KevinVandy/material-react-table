/* eslint-disable perfectionist/sort-objects */
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
    // eslint-disable-next-line
    if (err) console.log(err);
  });

  await fs.writeFile(`./locales/${locale}/index.esm.d.ts`, typeFile, (err) => {
    // eslint-disable-next-line
    if (err) console.log(err);
  });

  await fs.writeFile(
    `./locales/${locale}/package.json`,
    JSON.stringify(
      {
        main: './index.js',
        module: './index.esm.js',
        sideEffects: false,
        types: './index.d.ts',
        exports: {
          '.': {
            types: './index.d.ts',
            import: './index.esm.js',
            require: './index.js',
          },
          './package.json': './package.json',
        },
      },
      null,
      2,
    ),
    (err) => {
      // eslint-disable-next-line
      if (err) console.log(err);
    },
  );

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
