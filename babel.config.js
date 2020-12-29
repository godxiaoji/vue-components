module.exports = {
  presets: [['@babel/preset-env']],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3 // 指定 runtime-corejs 的版本，目前有 2 3 两个版本
      }
    ]
  ],
  env: {
    test: {
      presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
      plugins: ['require-context-hook']
    }
  }
}
