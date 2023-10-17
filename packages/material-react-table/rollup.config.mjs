import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import external from 'rollup-plugin-peer-deps-external';

export default [
  {
    external: [
      '@mui/icons-material',
      '@mui/material',
      '@tanstack/match-sorter-utils',
      '@tanstack/react-table',
      '@tanstack/react-virtual',
      'highlight-words',
      'react',
    ],
    input: './src/index.ts',
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
      typescript({
        rootDir: './src',
      }),
    ],
  },
  {
    input: './dist/esm/types/index.d.ts',
    output: [{ file: './dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];
