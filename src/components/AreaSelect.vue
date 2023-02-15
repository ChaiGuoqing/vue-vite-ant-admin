<template>
  <a-tree
    v-model:checkedKeys="checkedKeys"
    v-model:expandedKeys="expandedKeys"
    :tree-data="treeData"
    :load-data="onLoadData"
    :fieldNames="fieldNames"
    checkable
    :selectable="false"
    show-icon
  >
    <template #switcherIcon="{ switcherCls }">
      <SvgIcon :class="switcherCls" name="custom-tree-switcher" style="font-size: 10px" />
    </template>
    <template #icon="{ dataRef }">
      <SvgIcon v-if="dataRef.parentIndexCode === '-1'" name="tree-company" style="font-size: 15px" />
      <SvgIcon v-else-if="dataRef.isLeaf" name="tree-room" style="font-size: 13px" />
      <SvgIcon v-else name="tree-region" style="font-size: 15px" />
    </template>
  </a-tree>
</template>
<script setup>
import { getMonitorByRegion, getSubRegions, getRegion } from "@/api/region.js";
const props = defineProps({
  modelValue: Array,
});
const emits = defineEmits(["update:modelValue"]);
const expandedKeys = ref([]);
const treeData = ref([]);
const fieldNames = ref({
  title: "name",
  key: "indexCode",
});

const checkedKeys = computed({
  get() {
    return props.modelValue;
  },
  set(keys) {
    emits("update:modelValue", keys);
  },
});

getRegion().then((res) => {
  treeData.value = [res.data];
  expandedKeys.value = [res.data.indexCode];
  checkedKeys.value = props.modelValue;
});
// 加载树
async function onLoadData({ dataRef }) {
  const params = { parentIndexCode: dataRef.indexCode, resourceType: "region", pageNo: 1, pageSize: 500 };
  const res = await getSubRegions(params);
  dataRef.children = res.data.list;

  const monitor = await getMonitorByRegion({ indexCode: dataRef.indexCode });
  monitor.data?.list.forEach((item) => {
    const obj = Object.assign(item, { name: item.cameraName, indexCode: item.encodeDevIndexCode, isLeaf: true });
    dataRef.children.push(obj);
  });
  treeData.value = [...treeData.value];
  return treeData; // 返回promise
}
</script>
