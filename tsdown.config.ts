import { defineConfig } from 'tsdown'

const config = {
  entry: 'src/index.ts',
  sourcemap: false,   // 不生成 sourcemap 文件
  minify: true,       // 启动压缩
  treeshake: true,    // 开启 tree-shaking，去掉无用代码
  dts: {
    sourcemap: false, // dts 也不生成 sourcemap 文件
  },
}

export default defineConfig([
  {
    ...config,
    format: 'cjs',
    outDir: 'dist/cjs',
  },
  {
    ...config,
    format: 'esm',
    outDir: 'dist/esm',
  }
])

