<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <Link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path, onlyOneChild.query)">
        <a-menu-item :key="resolvePath(onlyOneChild.path)">
          <span :title="hasTitle(onlyOneChild.meta.title)">{{ onlyOneChild.meta.title }}</span>
        </a-menu-item>
      </Link>
    </template>
    <!-- 二级菜单 -->
    <a-sub-menu v-else :key="resolvePath(item.path)">
      <template v-if="item.meta" #title>
        <span :title="hasTitle(item.meta.title)">{{ item.meta.title }}</span>
      </template>
      <subItem v-for="child in item.children" :key="child.path" :is-nest="true" :item="child" :base-path="resolvePath(child.path)"></subItem>
    </a-sub-menu>
  </div>
</template>

<script setup>
import { isExternal } from "@/utils/validate";
import { getNormalPath } from "@/utils/index.js";
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: "",
  },
});
const onlyOneChild = ref({});

function hasOneShowingChild(children = [], parent) {
  if (!children) {
    children = [];
  }
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false;
    } else {
      onlyOneChild.value = item;
      return true;
    }
  });
  if (showingChildren.length === 1) {
    return true;
  }
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }
  return false;
}

function resolvePath(routePath, routeQuery) {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  if (routeQuery) {
    let query = JSON.parse(routeQuery);
    return { path: getNormalPath(props.basePath + "/" + routePath), query: query };
  }
  return getNormalPath(props.basePath + "/" + routePath);
}

function hasTitle(title) {
  if (title.length > 5) {
    return title;
  } else {
    return "";
  }
}
// // 获取父级菜单数据
// const chils = computed(() => {
//   return props.chil;
// });
// // 有子菜单
// const hasSubMenu = (val) => {
//   return val.children && val.children.length > 0;
// };
</script>
