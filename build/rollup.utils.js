import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import pkg from '../package.json'
// import babel from 'rollup-plugin-babel'

const inputs = [
  // apis
  'apis/callback',
  'apis/Notify',
  'apis/Popup',
  'apis/rules',
  'apis/Toast',
  'apis/types',
  // utils
  'utils/checkbox-radio',
  'utils/constants',
  'utils/form',
  'utils/group',
  'utils/list',
  'utils/popup',
  'utils/resize-detector',
  'utils/safe-area-insets',
  'utils/scroll',
  'utils/skeleton',
  'utils/tab',
  'utils/touch',
  'utils/types',
  'utils/validator',
  // helpers
  'helpers/animation',
  'helpers/device',
  'helpers/dom',
  'helpers/events',
  'helpers/exception',
  'helpers/input',
  'helpers/util',
  'index'
]

const deps = Object.keys(pkg.dependencies)

export default inputs.map(name => {
  return {
    input: `./src/${name}.ts`, // 必须，入口文件
    output: {
      format: 'esm',
      // 必须，输出文件 (如果要输出多个，可以是一个数组)
      // exports: 'named', // 输出多个文件
      file: `es/${name}.js`,
      // globals: {
      //   vue: 'Vue' // 告诉rollup全局变量Vue即是vue
      // },
      paths(id) {
        if (/^@\//.test(id)) {
          return id.replace('@/', '../')
        }
      }
    },
    external: id => {
      if (id === 'vue') {
        return true
      }

      if (/^@\//.test(id)) {
        return true
      }

      if (deps.some(k => new RegExp('^' + k).test(id))) {
        return true
      }

      return false
    },
    plugins: [
      resolve(),
      commonjs({
        include: 'node_modules/**'
      }),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false
          },
          include: ['src/**/*'],
          exclude: ['node_modules', '__tests__']
        },
        abortOnError: false,
        clean: true
      }),
      vue({
        target: 'browser',
        css: false
      })
      // babel({
      //   runtimeHelpers: true,
      //   // 只转换源代码，不运行外部依赖
      //   exclude: 'node_modules/**',
      //   // babel 默认不支持 ts 需要手动添加
      //   extensions: ['.ts']
      // })
    ]
  }
})
