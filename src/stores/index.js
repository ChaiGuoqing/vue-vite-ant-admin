// import { localCache } from "@/service/cache";

// export const useStore = defineStore("main", {
//   state: () => ({}),
//   getters: {},
//   actions: {},
// });
// import { createStore, useStore as baseUseStore } from "vuex";
// import createPersistedState from "vuex-persistedstate";

// const modulesFiles = import.meta.globEager("./modules/*.js");

// const modules = Object.keys(modulesFiles).reduce((module, modulePath) => {
//   const moduleName = modulePath.replace(/^\.\/modules\/(.*)\.\w+$/, "$1");
//   const value = modulesFiles[modulePath];
//   module[moduleName] = value.default;
//   return module;
// }, {});

// export const key = Symbol();

// export const store = createStore({
//   modules,
//   plugins: [
//     createPersistedState({
//       storage: window.sessionStorage,
//     }),
//   ],
// });

// export function useStore() {
//   return baseUseStore(key);
// }
const store = createPinia();

export default store;
