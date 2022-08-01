import dts from 'rollup-plugin-dts';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: './src/index.tsx',
    output: [
      {
        file: './dist/cjs/index.min.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/esm/material-react-table.esm.min.js',
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
      terser(),
    ],
  },
  {
    input: 'dist/esm/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];
