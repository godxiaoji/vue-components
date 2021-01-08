const { relative } = require('path')

function kebabCase2Pascalcase(name) {
  name = name.replace(/-(\w)/g, (all, letter) => {
    return letter.toUpperCase()
  })
  return name.substr(0, 1).toUpperCase() + name.substr(1)
}

module.exports = {
  kebabCase2Pascalcase,
  svgLoader(config, iconsPath) {
    config.module
      .rule('svg')
      .exclude.add(iconsPath)
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(iconsPath)
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId(filePath) {
          let paths = relative(iconsPath, filePath)
            .replace(/\\/g, '/')
            .split('/')

          const fileName = paths.pop().replace('.svg', '')

          return 'icon-' + kebabCase2Pascalcase([fileName].concat(paths).join('-'))
        }
      })
  }
}
