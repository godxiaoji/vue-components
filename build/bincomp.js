/* eslint-disable */
// 分进程打包，解决内存不足问题
const fs = require('fs')
const cp = require('child_process')
const ora = require('ora')
const chalk = require('chalk')
const { resolve } = require('path')

const spinner = ora(`${chalk.blue('Building...')}`).start()

const STEP = 4
const START = 0

const buildChild = (start, end) => {
  let s = start
  let e = end
  const c1 = cp.spawn('node', ['./build/build.component.js', s, e])
  c1.stdout.on('data', function(data) {
    spinner.info(chalk.blue(data))
  })

  c1.stderr.on('data', function(data) {
    spinner.warn(chalk.red(data))
  })

  c1.on('close', function(code) {
    s += STEP
    e += STEP
    if (s > paths.length) {
      fs.unlinkSync(resolve(__dirname, './ts.txt'))
      fs.unlinkSync(resolve(__dirname, './ts.json'))

      spinner.succeed(`${chalk.green('Build done. Exit code ' + code)}`)
      return
    }
    buildChild(s, e)
  })
}

const fileStr = fs.readFileSync(resolve(__dirname, './ts.txt'), 'utf8')

const paths = fileStr
  .split(`\n`)
  .filter(function(v) {
    return (
      v.indexOf('style/index.ts') === -1 &&
      v.indexOf('types.ts') === -1 &&
      v.indexOf('.d.ts') === -1 &&
      v !== ''
    )
  })
  .map(v => v.replace(/.ts$/, ''))

fs.writeFileSync(resolve(__dirname, './ts.json'), JSON.stringify(paths))

/**
 * @link https://github.com/ezolenko/rollup-plugin-typescript2/issues/177
 */
buildChild(START, STEP)
