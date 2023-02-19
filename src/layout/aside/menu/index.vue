<template>
  <a-menu :mode="menuMode" :theme="menuTheme" v-model:openKeys="state.openKeys" :selectedKeys="[defaultActive]" @openChange="onOpenChange">
    <SubItem v-for="(route, index) in sidebarRouters" :key="route.path + index" :item="route" :base-path="route.path"></SubItem>
  </a-menu>
</template>

<script setup>
import useSettingsStore from "@/stores/modules/themeConfig";
import usePermissionStore from "@/stores/modules/permission";

const route = useRoute();
const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();

// 获取布局配置信息
const menuTheme = computed(() => settingsStore.menuTheme);
const menuMode = computed(() => settingsStore.menuMode);
const sidebarRouters = computed(() => permissionStore.sidebarRouters);

// 菜单展开/收起
const isCollapse = computed(() => settingsStore.isCollapse);
const state = reactive({
  // 展开菜单key
  openKeys: [""],
  // 上一次展开菜单key
  preOpenKeys: [""],
});
// 监听菜单展开收起
watch(isCollapse, (val) => {
  // 收起菜单
  if (val) {
    // 备份展开菜单key
    state.preOpenKeys = state.openKeys;
    // 清空展开菜单key
    state.openKeys = [];
  } else {
    state.openKeys = state.preOpenKey;
  }
});
const defaultActive = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
const onOpenChange = (openKeys) => {
  console.log(openKeys);
  // const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1);
  // if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
  //   state.openKeys = openKeys;
  // } else {
  //   state.openKeys = latestOpenKey ? [latestOpenKey] : [];
  // }
};
</script>
