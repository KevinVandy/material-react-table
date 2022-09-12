import copy from 'rollup-plugin-copy';
import dts from 'rollup-plugin-dts';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';

const supportedLocales = ['en'];

export default [
  {
    external: [
      '@mui/icons-material',
      '@mui/material',
      '@tanstack/match-sorter-utils',
      '@tanstack/react-table',
      'react',
      'react-virtual',
    ],
    input: './src/index.tsx',
    output: [
      {
        file: './dist/cjs/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/esm/material-react-table.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react'],
      }),
      external(),
      resolve(),
      typescript(),
    ],
  },
  ...supportedLocales.map((locale) => ({
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
            src: `./dist/esm/_locales/${locale}.d.ts`,
            dest: './locales',
            rename: () =>
              format === 'esm' ? `${locale}.${format}.d.ts` : `${locale}.d.ts`,
          })),
        ],
      }),
    ],
  })),
  {
    input: 'dist/esm/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];
