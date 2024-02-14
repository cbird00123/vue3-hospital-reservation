import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

process.env = {
  ...process.env,
  ...loadEnv(process.env.NODE_ENV, process.cwd())
}
export default defineConfig(async () => ({
  define: {
    'process.env.VITE_API_SERVER': JSON.stringify(process.env.VITE_API_SERVER),
    'process.env.VITE_RPA_SERVER': JSON.stringify(process.env.VITE_RPA_SERVER)
  },
  // server: {
  //   host: '0.0.0.0',
  //   port: 3000,
  //   proxy: {
  //     '/api': {
  //       target: process.env.VITE_API_SERVER,
  //       changeOrigin: true,
  //       secure: false
  //     },
  //     '/rpa-server': {
  //       target: process.env.VITE_RPA_SERVER,
  //       changeOrigin: true,
  //       secure: false
  //     }
  //   }
  // },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  runtimeCompiler: true,
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString()
          }
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/scss/main";'
      }
    }
  },
  dayjs: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
    defaultTimeZone: 'Asia/Seoul',
    plugins: [
      'utc', // import 'dayjs/plugin/utc'
      'timezone' // import 'dayjs/plugin/timezone'
    ]
  },
  optimizeDeps: {
    extensions: ['.scss', '.sass'],
    esbuildOptions: {
      plugins: [
        (await import('esbuild-sass-plugin')).sassPlugin({
          type: 'style',
          // Setting `logger.warn` to no-op is a workaround for
          // https://github.com/sass/sass/issues/3065#issuecomment-868302160.
          // Since `optimizeDeps` is only processing third party dependencies and only during dev,
          // we don't care about *any* deprecation warnings. The `quietDeps` SASS option doesn't work.
          logger: { warn() {} }
        })
      ]
    }
  }
}))
