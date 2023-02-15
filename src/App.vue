<template>
  <!-- antd 全局格式化：主要是分页部件中文显示   -->
  <a-config-provider :locale="zhCN">
    <RouterView />
  </a-config-provider>
</template>

<script setup>
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import zhCN from "ant-design-vue/es/locale/zh_CN";
dayjs.locale("zh-cn");
</script>
