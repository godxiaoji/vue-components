/* eslint-disable */
// 分进程打包，解决内存不足问题
const cp = require('child_process')
const ora = require('ora')
const chalk = require('chalk')
const tss = require('./ts-files.json')

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
    if (s > tss.length) {

      spinner.succeed(`${chalk.green('Build done. Exit code ' + code)}`)
      return
    }
    buildChild(s, e)
  })
}

/**
 * @link https://github.com/ezolenko/rollup-plugin-typescript2/issues/177
 */
buildChild(START, STEP)
