import dts from 'rollup-plugin-dts';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';

const externals = [
  '@mui/icons-material',
  '@mui/material',
  '@tanstack/match-sorter-utils',
  '@tanstack/react-table',
  '@tanstack/react-virtual',
  'react',
  'react-virtual',
];

const plugins = [
  babel({
    exclude: 'node_modules/**',
    presets: ['@babel/preset-react'],
  }),
  external(),
  resolve(),
  typescript(),
];

export default [
  {
    external: externals,
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
    plugins,
  },
  {
    input: 'dist/esm/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];
