<template>
  <!--   <div class="layout-logo" v-if="themeConfig.isLogo"> -->
  <div class="layout-logo">
    <div class="title">OA管理平台</div>
    <!-- <img src="@/assets/images/logo.svg" class="layout-logo-medium-img" /> -->
  </div>
</template>

<script setup>
// import { computed } from "vue";
// import { useStore } from "@/stores/index";

// const store = useStore();
// 获取布局配置信息
// const themeConfig = computed(() => {
//   return store.state.themeConfig;
// });
</script>

<style scoped lang="scss">
.layout-logo {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  .title {
    width: 100%;
    height: 60px;
    font-size: 20px;
    text-align: center;
    line-height: 60px;
    color: #1364fc;
    font-weight: 600;
  }
  .layout-logo-medium-img {
    width: 100%;
    padding-left: 20px;
  }
}
</style>
