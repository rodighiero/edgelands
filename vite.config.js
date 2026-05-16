import { defineConfig } from 'vite'

export default defineConfig({
  base: '/edgelands/',
  assetsInclude: ['**/*.fnt', '**/*.csv'],
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
})
