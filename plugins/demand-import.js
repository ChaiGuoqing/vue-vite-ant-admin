import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

export default function createDemandImport() {
  return Components({
    dts: false,
    dirs: ["src"], // 默认src/components文件夹；该路径下所有组件都会被自动注册，并支持代码分割
    resolvers: [AntDesignVueResolver({ importStyle: "scss" })],
  });
}
