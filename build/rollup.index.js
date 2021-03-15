import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import pkg from '../package.json'

const deps = Object.keys(pkg.dependencies)

export default [
  {
    input: `./src/index.ts`,
    output: {
      format: 'esm',
      file: `es/index.js`,
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
