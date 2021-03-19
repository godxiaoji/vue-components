/* eslint-disable */
import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sass from 'rollup-plugin-sass'
import pkg from '../package.json'

const deps = Object.keys(pkg.dependencies)

export default [
  {
    input: `./src/index.ts`,
    output: {
      format: 'esm',
      file: `es/index.full.js`,
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

      //   if (/^@\//.test(id)) {
      //     return true
      //   }

      if (id === './style') {
        // 样式不做打包
        return true
      }

      if (deps.some(k => new RegExp('^' + k).test(id))) {
        return true
      }

      return false
    },
    plugins: [
      {
        name: 'replaceAlias',
        transform(code, id) {
          console.log(`Build: ${id} ...`)
          return code.replace(/@\//, '../')
        }
      },
      sass({
        output: true
      }),
      nodeResolve(),
      commonjs({
        include: 'node_modules/**'
      }),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true
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
    ]
  }
]
