/* eslint-disable */
const pkg = require('../package.json')
const { resolve } = require('path')
const nodeResolve = require('rollup-plugin-node-resolve')
const vue = require('rollup-plugin-vue')
const rollup = require('rollup')
const typescript = require('rollup-plugin-typescript2')
const commonjs = require('rollup-plugin-commonjs')
const tss = require('./ts-files.json')

const deps = Object.keys(pkg.dependencies)

const runBuild = async () => {
  let index = 0

  const inputs = tss.slice(process.argv[2], process.argv[3])

  build(inputs[index])

  async function build(name) {
    if (!name) return

    const inputOptions = {
      input: resolve(__dirname, `../src/${name}.ts`), // 必须，入口文件
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
        nodeResolve(),
        commonjs({
          include: 'node_modules/**'
        }),
        vue({
          target: 'browser',
          css: false
        }),
        typescript({
          tsconfigOverride: {
            compilerOptions: {
              declaration: false
            },
            // include: ['src/**/*'],
            exclude: ['node_modules', '__tests__']
          },
          abortOnError: false
          // clean: true
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

    const outOptions = {
      format: 'es',
      file: `es/${name}.js`,
      paths(id) {
        if (/^@\//.test(id)) {
          return id.replace('@/', '../')
        }
      }
    }

    const bundle = await rollup.rollup(inputOptions)
    console.log(name, 'done')
    await bundle.write(outOptions)
    index++
    if (index < inputs.length) {
      await build(inputs[index])
    }
  }
}

runBuild()
