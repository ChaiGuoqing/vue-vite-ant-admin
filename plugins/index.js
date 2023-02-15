import vue from "@vitejs/plugin-vue";

import createAutoImport from "./auto-import";
import createSvgIcon from "./svg-icon";
import createCompression from "./compression";
import createDemandImport from "./demand-import";

export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [vue(), createAutoImport(), createSvgIcon(isBuild), createDemandImport()];
  isBuild && vitePlugins.push(...createCompression(viteEnv));
  return vitePlugins;
}
