import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

import componentList from '../src/component-list'

export default componentList.map(name => {
  return {
    input: `./src/${name}/index.ts`, // 必须，入口文件
    output: {
      format: 'esm',
      // 必须，输出文件 (如果要输出多个，可以是一个数组)
      // exports: 'named', // 输出多个文件
      file: `es/${name}/index.js`,
      globals: {
        vue: 'Vue' // 告诉rollup全局变量Vue即是vue
      }
    },
    external: ['vue'],
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
          exclude: ['node_modules', '__tests__']
        },
        abortOnError: false,
        clean: true
      }),
      vue({
        compileTemplate: true
      })
    ]
  }
})
