import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import minify from 'rollup-plugin-babel-minify';

const format = process.env.FORMAT;
const env = process.env.NODE_ENV;

const src = path.resolve('src');
const umd = path.resolve('umd');
const es = path.resolve('es');

const name = 'vx-shape';
const globalName = name.replace('-', '');
const suffix = env === 'production' ? 'production.min' : 'development';
const dest = format === 'umd' ? umd : es;

const config = {
  sourcemap: false,
  input: path.join(src, 'index.js'),
  output: {
    name: globalName,
    format,
    exports: 'named',
    globals: { react: 'React' },
    file: path.join(dest, `${name}.${suffix}.js`)
  },
  external: ['react'],
  plugins: [
    resolve({ browser: true }),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      exclude: 'node_modules/**'
    })
  ]
};

if (env === 'production' && format === 'umd') {
  config.plugins.push(uglify());
}

if (env === 'production' && format === 'es') {
  config.plugins.push(minify());
}

export default config;
