/* eslint-env node  */
const mode = process.env.NODE_ENV;
const isProd = mode === 'production';

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          forceAllTransforms: true,
          useBuiltIns: 'entry',
          corejs: '2',
        },
      ],
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
      '@babel/plugin-transform-runtime',
      '@babel/plugin-transform-object-assign',
      '@babel/plugin-syntax-dynamic-import',
      [
        'import',
        {
          libraryName: 'lodash',
          camel2DashComponentName: false,
          libraryDirectory: '',
          style: false,
        },
        'lodash',
      ],
      [
        'import',
        {
          libraryName: 'antd',
          style: 'css',
        },
        'antd',
      ],
      'react-hot-loader/babel',
    ].concat(isProd ? ['transform-remove-console', 'transform-remove-debugger'] : []),
  };
};
