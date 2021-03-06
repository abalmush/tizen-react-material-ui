import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import html from '@rollup/plugin-html';
import scss from 'rollup-plugin-scss';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import * as react from 'react';
import * as reactDom from 'react-dom';
import * as reactIs from 'react-is';
import * as propTypes from 'prop-types';

const isProd = process.env.NODE_ENV === 'production';
const extensions = ['.js', '.ts', '.tsx'];

export default {
  input: 'src/index.tsx',
  output: {
    dir: './basic',
    format: 'iife',
  },
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
    }),
    resolve({
      extensions,
    }),
    commonjs({
      include: /node_modules/,
      namedExports: {
        'react': Object.keys(react),
        'react-dom': Object.keys(reactDom),
        'react-is': Object.keys(reactIs),
        'prop-types': Object.keys(propTypes),
      }
    }),
    babel({
      extensions,
      exclude: /node_modules/,
      babelrc: false,
      runtimeHelpers: true,
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      plugins: [
        'react-require',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        ['@babel/plugin-proposal-object-rest-spread', {
          useBuiltIns: true,
        }],
        ['@babel/plugin-transform-runtime', {
          corejs: 3,
          helpers: true,
          regenerator: true,
          useESModules: false,
        }],
      ],
    }),
    html({
      fileName: 'index.html',
      title: 'Tizen Web + React + Material UI',
      template: ({ title }) => {
        return `
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
              <meta name="description" content="Tizen Wearable basic template generated by Samsung Wearable Web IDE"/>
          
              <title>${title}</title>
          
              <link rel="stylesheet" type="text/css" href="css/index.css"/>
          </head>

          <body>
            <div class="contents" id="root"></div>
            <script src="index.js"></script>
          </body>
          </html>
        `;
      },
    }),
    scss({
      output: 'basic/css/index.css',
    }),
    (isProd && terser()),
    (!isProd && serve({
      host: 'localhost',
      port: 3000,
      open: true,
      contentBase: ['./basic'],
    })),
    (!isProd && livereload({
      watch: '.',
    })),
  ],
};
