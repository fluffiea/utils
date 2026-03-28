import { defineConfig } from 'tsdown'

const config = {
  entry: 'src/index.ts',
  sourcemap: true,
  dts: {
    sourcemap: true,
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

