/* eslint-env node  */
const mode = process.env.NODE_ENV;
const isProd = mode === 'production';
const coreJsVersion = require('core-js/package.json').version;

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      '@babel/preset-react',
      '@babel/preset-env',
      /*
      [
        '@babel/preset-env',
        {
          // for browser only support ES5
          // forceAllTransforms: true,

          modules: false,

          useBuiltIns: 'entry',

          corejs: {
            version: coreJsVersion,
            // enable polyfilling of every proposal supported by core-js
            proposals: true,
          },
        },
      ],
      */
    ],

    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@src': './src',
          },
        },
      ],
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-object-assign',
      '@babel/plugin-syntax-dynamic-import',
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: 3,
          version: coreJsVersion,
        },
      ],
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'lib',
          style: 'css', // `style: true` 会加载 less 文件
        },
      ],
    ].concat(isProd ? ['transform-remove-console', 'transform-remove-debugger'] : ['react-refresh/babel']),
  };
};
