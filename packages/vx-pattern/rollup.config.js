import path from 'path';
import colors from 'colors';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import minify from 'rollup-plugin-babel-minify';
import replace from 'rollup-plugin-replace';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

const format = process.env.FORMAT;
const env = process.env.NODE_ENV;

const src = path.resolve('src');
const umd = path.resolve('umd');
const es = path.resolve('es');

const name = 'vx-pattern';
const globalName = name.replace('-', '');
const productionEnv = env === 'production';
const umdFormat = format === 'umd';
const esFormat = format === 'es';
const suffix = productionEnv ? 'production' : 'development';
const filename = `${name}.${suffix}`;
const dest = umdFormat ? umd : es;

function stripEnvVariables(production) {
  return {
    __DEV__: production ? 'false' : 'true',
    'process.env.NODE_ENV': production
      ? JSON.stringify('production')
      : JSON.stringify('development')
  };
}

const config = {
  input: path.join(src, 'index.js'),
  output: {
    name: globalName,
    format,
    globals: {
      react: 'React',
      classnames: 'classnames',
      'prop-types': 'PropTypes'
    },
    file: path.join(dest, `${filename}.js`)
  },
  external: Object.keys(pkg.dependencies || {}).concat(
    Object.keys(pkg.peerDependencies || {})
  ),
  plugins: [
    replace(stripEnvVariables(productionEnv)),
    resolve(),
    babel({ exclude: 'node_modules/**' }),
    commonjs(),
    productionEnv && umdFormat && uglify(),
    productionEnv && esFormat && minify({ comments: false }),
    filesize({
      render: (opt, size, gzip, bundle) => {
        const primaryColor = opt.theme === 'dark' ? 'green' : 'black';
        const secondaryColor = opt.theme === 'dark' ? 'yellow' : 'blue';

        return `${colors[primaryColor].bold('Bundle size: ')}${colors[
          secondaryColor
        ](size)}${
          opt.showGzippedSize
            ? '\n' +
              colors[primaryColor].bold('Gzipped size: ') +
              colors[secondaryColor](gzip)
            : ''
        }`;
      }
    })
  ]
};

export default config;
