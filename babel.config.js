
function getConfig(api) {
  api.cache(true)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          useBuiltIns: 'usage',
          corejs: {
            version: '3.8',
            proposals: true
          },
          modules: 'cjs'
        }
      ],
      '@babel/preset-react',
    ],
    plugins: [
      [
        "@babel/plugin-transform-runtime",
        {
          corejs: false,
          "helpers": true
        }
      ],
      ['@babel/plugin-syntax-dynamic-import'],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      'lodash'
    ]
  }
}

module.exports = getConfig
