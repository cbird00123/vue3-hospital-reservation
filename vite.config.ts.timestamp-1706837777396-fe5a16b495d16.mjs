// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/user/Desktop/work/wiseai-appointment-front/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/user/Desktop/work/wiseai-appointment-front/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/user/Desktop/work/wiseai-appointment-front/vite.config.ts";
var vite_config_default = defineConfig(async () => ({
  server: {
    host: "0.0.0.0",
    port: 3e3,
    proxy: {
      "/api": {
        target: process.env.API_SERVER,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  runtimeCompiler: true,
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
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
    locales: ["ko", "en"],
    defaultLocale: "ko",
    defaultTimeZone: "Asia/Seoul",
    plugins: [
      "utc",
      // import 'dayjs/plugin/utc'
      "timezone"
      // import 'dayjs/plugin/timezone'
    ]
  },
  optimizeDeps: {
    extensions: [".scss", ".sass"],
    esbuildOptions: {
      plugins: [
        (await import("file:///C:/Users/user/Desktop/work/wiseai-appointment-front/node_modules/esbuild-sass-plugin/lib/index.js")).sassPlugin({
          type: "style",
          // Setting `logger.warn` to no-op is a workaround for
          // https://github.com/sass/sass/issues/3065#issuecomment-868302160.
          // Since `optimizeDeps` is only processing third party dependencies and only during dev,
          // we don't care about *any* deprecation warnings. The `quietDeps` SASS option doesn't work.
          logger: { warn() {
          } }
        })
      ]
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx1c2VyXFxcXERlc2t0b3BcXFxcd29ya1xcXFx3aXNlYWktYXBwb2ludG1lbnQtZnJvbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcRGVza3RvcFxcXFx3b3JrXFxcXHdpc2VhaS1hcHBvaW50bWVudC1mcm9udFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvdXNlci9EZXNrdG9wL3dvcmsvd2lzZWFpLWFwcG9pbnRtZW50LWZyb250L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyhhc3luYyAoKSA9PiAoe1xuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgcG9ydDogMzAwMCxcbiAgICBwcm94eToge1xuICAgICAgJy9hcGknOiB7XG4gICAgICAgIHRhcmdldDogcHJvY2Vzcy5lbnYuQVBJX1NFUlZFUixcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBwbHVnaW5zOiBbdnVlKCldLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgfVxuICB9LFxuICBydW50aW1lQ29tcGlsZXI6IHRydWUsXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rcyhpZCkge1xuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcbiAgICAgICAgICAgIHJldHVybiBpZFxuICAgICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAuc3BsaXQoJ25vZGVfbW9kdWxlcy8nKVsxXVxuICAgICAgICAgICAgICAuc3BsaXQoJy8nKVswXVxuICAgICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgc2Nzczoge1xuICAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCIuL3NyYy9hc3NldHMvc2Nzcy9tYWluXCI7J1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgZGF5anM6IHtcbiAgICBsb2NhbGVzOiBbJ2tvJywgJ2VuJ10sXG4gICAgZGVmYXVsdExvY2FsZTogJ2tvJyxcbiAgICBkZWZhdWx0VGltZVpvbmU6ICdBc2lhL1Nlb3VsJyxcbiAgICBwbHVnaW5zOiBbXG4gICAgICAndXRjJywgLy8gaW1wb3J0ICdkYXlqcy9wbHVnaW4vdXRjJ1xuICAgICAgJ3RpbWV6b25lJyAvLyBpbXBvcnQgJ2RheWpzL3BsdWdpbi90aW1lem9uZSdcbiAgICBdXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGV4dGVuc2lvbnM6IFsnLnNjc3MnLCAnLnNhc3MnXSxcbiAgICBlc2J1aWxkT3B0aW9uczoge1xuICAgICAgcGx1Z2luczogW1xuICAgICAgICAoYXdhaXQgaW1wb3J0KCdlc2J1aWxkLXNhc3MtcGx1Z2luJykpLnNhc3NQbHVnaW4oe1xuICAgICAgICAgIHR5cGU6ICdzdHlsZScsXG4gICAgICAgICAgLy8gU2V0dGluZyBgbG9nZ2VyLndhcm5gIHRvIG5vLW9wIGlzIGEgd29ya2Fyb3VuZCBmb3JcbiAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vc2Fzcy9zYXNzL2lzc3Vlcy8zMDY1I2lzc3VlY29tbWVudC04NjgzMDIxNjAuXG4gICAgICAgICAgLy8gU2luY2UgYG9wdGltaXplRGVwc2AgaXMgb25seSBwcm9jZXNzaW5nIHRoaXJkIHBhcnR5IGRlcGVuZGVuY2llcyBhbmQgb25seSBkdXJpbmcgZGV2LFxuICAgICAgICAgIC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgKmFueSogZGVwcmVjYXRpb24gd2FybmluZ3MuIFRoZSBgcXVpZXREZXBzYCBTQVNTIG9wdGlvbiBkb2Vzbid0IHdvcmsuXG4gICAgICAgICAgbG9nZ2VyOiB7IHdhcm4oKSB7fSB9XG4gICAgICAgIH0pXG4gICAgICBdXG4gICAgfVxuICB9XG59KSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVYsU0FBUyxlQUFlLFdBQVc7QUFFMVgsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBSHlNLElBQU0sMkNBQTJDO0FBTTFRLElBQU8sc0JBQVEsYUFBYSxhQUFhO0FBQUEsRUFDdkMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUSxRQUFRLElBQUk7QUFBQSxRQUNwQixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsTUFDOUM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUyxDQUFDLElBQUksQ0FBQztBQUFBLEVBQ2YsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGlCQUFpQjtBQUFBLEVBQ2pCLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGFBQWEsSUFBSTtBQUNmLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixtQkFBTyxHQUNKLFNBQVMsRUFDVCxNQUFNLGVBQWUsRUFBRSxDQUFDLEVBQ3hCLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFDWixTQUFTO0FBQUEsVUFDZDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFNBQVMsQ0FBQyxNQUFNLElBQUk7QUFBQSxJQUNwQixlQUFlO0FBQUEsSUFDZixpQkFBaUI7QUFBQSxJQUNqQixTQUFTO0FBQUEsTUFDUDtBQUFBO0FBQUEsTUFDQTtBQUFBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFlBQVksQ0FBQyxTQUFTLE9BQU87QUFBQSxJQUM3QixnQkFBZ0I7QUFBQSxNQUNkLFNBQVM7QUFBQSxTQUNOLE1BQU0sT0FBTywyR0FBcUIsR0FBRyxXQUFXO0FBQUEsVUFDL0MsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFLTixRQUFRLEVBQUUsT0FBTztBQUFBLFVBQUMsRUFBRTtBQUFBLFFBQ3RCLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
