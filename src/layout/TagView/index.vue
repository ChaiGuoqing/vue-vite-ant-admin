<template>
  <div class="layout-tag-view">
    <div class="tag-class">
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        :data-name="tag.name"
        class="tag-index-class"
        :class="{ 'is-active': isActive(tag) }"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span @click.prevent.stop="closeSelectedTag(tag)">
          <CloseOutlined class="ml-5" />
        </span>
      </router-link>
    </div>
    <transition name="component-fade">
      <div
        class="custom-contextmenu"
        :style="{
          top: `${top + 5}px`,
          left: `${left}px`,
        }"
        v-show="visible"
      >
        <ul>
          <li @click="refreshSelectedTag(selectedTag)">
            <RedoOutlined class="ml-5" />
            <span>刷新页面</span>
          </li>
          <li @click="closeSelectedTag(selectedTag)">
            <CloseOutlined class="ml-5" />
            <span>关闭当前</span>
          </li>
          <li @click="closeOthersTags">
            <CloseCircleOutlined class="ml-5" />
            <span>关闭其他</span>
          </li>
          <li v-if="!isFirstView()" @click="closeLeftTags">
            <CloseCircleOutlined class="ml-5" />
            <span>关闭左侧</span>
          </li>
          <li v-if="!isLastView()" @click="closeRightTags">
            <CloseCircleOutlined class="ml-5" />
            <span>关闭右侧</span>
          </li>
          <li @click="closeAllTags(selectedTag)">
            <CloseSquareOutlined class="ml-5" />
            <span>全部关闭</span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { RedoOutlined, CloseOutlined, CloseCircleOutlined, CloseSquareOutlined } from "@ant-design/icons-vue";
import { getNormalPath } from "@/utils/index.js";
import useTagsViewStore from "@/stores/modules/tagsView";
import usePermissionStore from "@/stores/modules/permission";
import tabEvent from "@/utils/tab.js";

const visible = ref(false);
const top = ref(0);
const left = ref(0);
const selectedTag = ref({});
const affixTags = ref([]);
const route = useRoute();
const router = useRouter();

const visitedViews = computed(() => useTagsViewStore().visitedViews);
const routes = computed(() => usePermissionStore().routes);

watch(route, () => {
  addTags();
  moveToCurrentTag();
});
watch(visible, (value) => {
  if (value) {
    document.body.addEventListener("click", closeMenu);
  } else {
    document.body.removeEventListener("click", closeMenu);
  }
});

onMounted(() => {
  initTags();
  addTags();
});

function isActive(r) {
  return r.path === route.path;
}
function isFirstView() {
  try {
    return selectedTag.value.fullPath === visitedViews.value[1].fullPath || selectedTag.value.fullPath === "/index";
  } catch (err) {
    return false;
  }
}
function isLastView() {
  try {
    return selectedTag.value.fullPath === visitedViews.value[visitedViews.value.length - 1].fullPath;
  } catch (err) {
    return false;
  }
}
function filterAffixTags(routes, basePath = "") {
  let tags = [];
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = getNormalPath(basePath + "/" + route.path);
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      });
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path);
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags];
      }
    }
  });
  return tags;
}
function initTags() {
  const res = filterAffixTags(routes.value);
  affixTags.value = res;
  for (const tag of res) {
    // Must have tag name
    if (tag.name) {
      useTagsViewStore().addVisitedView(tag);
    }
  }
}
function addTags() {
  const { name } = route;
  if (name) {
    useTagsViewStore().addView(route);
    if (route.meta.link) {
      useTagsViewStore().addIframeView(route);
    }
  }
  return false;
}
function moveToCurrentTag() {
  nextTick(() => {
    for (const r of visitedViews.value) {
      if (r.path === route.path) {
        // scrollPaneRef.value.moveToTarget(r);
        // when query is different then update
        if (r.fullPath !== route.fullPath) {
          useTagsViewStore().updateVisitedView(route);
        }
      }
    }
  });
}
function refreshSelectedTag(view) {
  tabEvent.refreshPage(view);
  if (route.meta.link) {
    useTagsViewStore().delIframeView(route);
  }
}
function closeSelectedTag(view) {
  tabEvent.closePage(view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view);
    }
  });
}
function closeRightTags() {
  tabEvent.closeRightPage(selectedTag.value).then((visitedViews) => {
    if (!visitedViews.find((i) => i.fullPath === route.fullPath)) {
      toLastView(visitedViews);
    }
  });
}
function closeLeftTags() {
  tabEvent.closeLeftPage(selectedTag.value).then((visitedViews) => {
    if (!visitedViews.find((i) => i.fullPath === route.fullPath)) {
      toLastView(visitedViews);
    }
  });
}
function closeOthersTags() {
  router.push(selectedTag.value).catch(() => {});
  tabEvent.closeOtherPage(selectedTag.value).then(() => {
    moveToCurrentTag();
  });
}
function closeAllTags(view) {
  tabEvent.closeAllPage().then(({ visitedViews }) => {
    if (affixTags.value.some((tag) => tag.path === route.path)) {
      return;
    }
    toLastView(visitedViews, view);
  });
}
function toLastView(visitedViews, view) {
  const latestView = visitedViews.slice(-1)[0];
  if (latestView) {
    router.push(latestView.fullPath);
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === "Dashboard") {
      // to reload home page
      router.replace({ path: "/redirect" + view.fullPath });
    } else {
      router.push("/");
    }
  }
}
// 右键点击时：传 x,y 坐标值到子组件中（props）
function openMenu(tag, e) {
  const { clientX, clientY } = e;
  left.value = clientX;
  top.value = clientY;
  visible.value = true;
  selectedTag.value = tag;
}
function closeMenu() {
  visible.value = false;
}
</script>
<style lang="scss" scoped>
.layout-tag-view {
  width: 100%;
  // background-color: #ffffff;
  // border-bottom: 1px solid #f1f2f3;
  // box-shadow: rgb(0 21 41 / 4%) 0px 1px 4px;
  .tag-class {
    // height: 50px;
    // line-height: 50px;
    display: flex;
    align-items: center;
    color: #606266;
    font-size: 12px;
    white-space: nowrap;
    padding: 0 15px;
    .tag-index-class {
      height: 26px;
      line-height: 26px;
      display: flex;
      align-items: center;
      border: 1px solid #e6e6e6;
      padding: 0 15px;
      margin-right: 5px;
      border-radius: 2px;
      position: relative;
      z-index: 0;
      cursor: pointer;
      justify-content: space-between;
      &:hover {
        background-color: #b3d8ff;
        color: var(--color-primary);
        border-color: #09c7f7;
      }
    }
  }
  .is-active {
    color: #ffffff;
    background: var(--color-primary);
    border-color: var(--color-primary);
  }
  .custom-contextmenu {
    z-index: 2190;
    position: fixed;
    padding: 10px 0;
    box-sizing: border-box;
    border-radius: 4px;
    cursor: pointer;
    background: #fff;
    border: 1px solid #e4e7ed;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        line-height: 36px;
        padding: 0 20px;
        box-sizing: border-box;
        font-size: 12px !important;
        color: #606266;
      }
      li:hover {
        background: #ecf5ff;
        color: var(--color-primary);
      }
    }
  }
}
</style>
