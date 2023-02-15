<template>
  <a-layout-header class="layout-header" :class="[isTagView && 'h-90']">
    <!-- <NavBar /> -->
    <div class="layout-navbar">
      <div class="navbar-left">
        <!-- <span class="menu-icon" @click="onMenuIconClick">
          <MenuUnfoldOutlined v-if="isCollapse" />
          <MenuFoldOutlined v-else />
        </span> -->
        <BreadCrumb></BreadCrumb>
      </div>
      <div class="navbar-right">
        <RightAside></RightAside>
      </div>
    </div>
    <!-- TagView -->
    <TagView v-if="isTagView"></TagView>
  </a-layout-header>
</template>
<script setup>
// import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import useSettingsStore from "@/stores/modules/themeConfig";
// 获取布局配置信息
const settingsStore = useSettingsStore();
const isTagView = computed(() => settingsStore.isTagView);
// const isCollapse = computed(() => settingsStore.isCollapse);
// // 展开/收起左侧菜单点击
// const onMenuIconClick = () => {
//   console.log("1111111");
//   const isCollapseClick = !isCollapse;
//   settingsStore.setState({ key: "isCollapse", value: isCollapseClick });
// };
</script>
<style lang="scss" scoped>
.h-90 {
  height: 75px !important;
}
.layout-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navbar-left {
  display: flex;
  align-items: center;
  padding-left: 16px;
  .menu-icon {
    padding: 0 15px;
    cursor: pointer;
  }
}
</style>
