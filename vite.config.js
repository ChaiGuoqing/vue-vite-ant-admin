import { defineConfig, loadEnv } from "vite";
import { fileURLToPath, URL } from "node:url";
import createVitePlugins from "./plugins";

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const isProd = env.VITE_APP_ENV === "production";
  return {
    base: isProd ? "/" : "/",
    plugins: createVitePlugins(env, command === "build"),
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    // vite 相关配置
    server: {
      port: 8888,
      host: true,
      hmr: true,
      usePolling: true,
      proxy: {
        "/prod-api": {
          // 服务器地址
          target: "http://vue.ruoyi.vip/",
          // target: "http://10.67.78.13:8080",
          // target: "http://10.69.3.13:9030",
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api/, ""),
        },
      },
    },
    preview: {
      host: true,
      proxy: {
        "/manager": {
          target: "http://10.67.77.160:8088", // 服务器地址
          changeOrigin: true,
        },
      },
    },
    build: {
      cssTarget: "chrome83",
    },
  };
});
