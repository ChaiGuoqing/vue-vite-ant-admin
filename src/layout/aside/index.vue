<template>
  <a-layout-sider class="layout-aside" :width="asideWidth" :class="`layout-aside-${menuTheme}`" v-model:collapsed="isCollapse" :trigger="null">
    <Logo v-if="!isCollapse"></Logo>
    <Menu></Menu>
  </a-layout-sider>
</template>
<script setup>
import useSettingsStore from "@/stores/modules/themeConfig";
const settingsStore = useSettingsStore();
const menuTheme = computed(() => settingsStore.menuTheme);
const asideWidth = computed(() => settingsStore.asideWidth);
const isCollapse = computed(() => settingsStore.isCollapse);
</script>
