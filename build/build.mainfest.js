/* eslint-disable */
const fs = require('fs')
const cp = require('child_process')
const ora = require('ora')
const chalk = require('chalk')
const { resolve } = require('path')

const spinner = ora(`${chalk.blue('Building...')}`).start()

const build = () => {
  cp.exec(
    `gulp cts --gulpfile ${resolve(__dirname, './gulpfile.js')}`,
    (error, stdout, stderr) => {
      if (error) {
        spinner.warn(chalk.red(error))
        return
      }
      spinner.info(chalk.blue(stdout))

      buildJSON(0)
      // console.error(`stderr: ${stderr}`)
    }
  )

  //   const c1 = cp.spawn('gulp', ['cts', '--gulpfile', 'build/gulpfile.js'])
  //   c1.stdout.on('data', function(data) {
  //     spinner.info(chalk.blue(data))
  //   })

  //   c1.stderr.on('data', function(data) {
  //     spinner.warn(chalk.red(data))
  //   })

  //   c1.on('close', function(code) {
  //     buildJSON(code)
  //   })
}

const buildJSON = code => {
  const fileStr = fs.readFileSync(resolve(__dirname, './ts-files.txt'), 'utf8')

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
    .sort()

  fs.writeFileSync(resolve(__dirname, './ts-files.json'), JSON.stringify(paths))
  fs.unlinkSync(resolve(__dirname, './ts-files.txt'))

  spinner.succeed(`${chalk.green('Build done. Exit code ' + code)}`)
}

build()
