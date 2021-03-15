module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false
      }
    ],
    '@babel/typescript'
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        useESModules: true, // 使用 esm 形式的 helper
        corejs: 3 // 指定 runtime-corejs 的版本，目前有 2 3 两个版本
      }
    ]
  ],
  env: {
    utils: {
      ignore: ['**/*.test.ts', '**/*.spec.ts'],
      presets: [
        [
          '@babel/preset-env',
          {
            loose: true,
            modules: false
          }
        ]
      ],
      plugins: [
        // [
        //   'babel-plugin-module-resolver',
        //   {
        //     root: ['element-plus'],
        //     alias: {
        //       '@element-plus': 'element-plus/lib'
        //     }
        //   }
        // ]
      ]
    },
    test: {
      presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
      plugins: ['require-context-hook']
    }
  }
}
