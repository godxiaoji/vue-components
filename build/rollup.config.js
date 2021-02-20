import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'

export default [
  {
    input: './src/Switch/index.ts', // 必须，入口文件
    output: {
      format: 'esm',
      // 必须，输出文件 (如果要输出多个，可以是一个数组)
      // exports: 'named', // 输出多个文件
      file: 'es/Switch/index.js',
      globals: {
        vue: 'Vue' // 告诉rollup全局变量Vue即是vue
      }
    },
    external: ['vue'],
    plugins: [
      resolve(),
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
]
