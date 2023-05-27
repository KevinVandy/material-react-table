import { rollup } from 'rollup';
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
  'hu',
  'id',
  'it',
  'ja',
  'nl',
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
    input: `./src/_locales/${locale}.ts`,
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
}

async function run() {
  for (const locale of supportedLocales) {
    await build(locale);
  }
}

// eslint-disable-next-line
run().catch((error) => console.error(error));
