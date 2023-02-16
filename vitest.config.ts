import { defineConfig } from 'vitest/config'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig(() => ({
  plugins: [
    solidPlugin({
      hot: false,
    }),
  ],
  test: {
    watch: false,
  },
}))
