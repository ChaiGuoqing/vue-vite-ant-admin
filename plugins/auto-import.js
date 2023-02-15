import autoImport from "unplugin-auto-import/vite";

export default function createAutoImport() {
  return autoImport({
    imports: ["vue", "vue-router", "pinia"],
    eslintrc: {
      enabled: true,
      filepath: "./plugins/.eslintrc-auto-import.json",
    },
    dts: false,
  });
}
