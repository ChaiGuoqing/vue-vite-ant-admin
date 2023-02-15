<template>
  <div class="m-table" ref="mTableRef" :class="props.class" :style="props.style">
    <!-- 表格 -->
    <a-table
      class="a-table"
      size="middle"
      :pagination="false"
      :scroll="scroll"
      :row-class-name="(r, i) => i % 2 === 1 && 'table-striped'"
      v-bind="$attrs"
    >
      <template #bodyCell="data"><slot name="bodyCell" v-bind="data"> </slot> </template>
      <template v-if="showExpanded" #expandedRowRender="data"><slot name="expandedRowRender" v-bind="data"> </slot></template>
    </a-table>
    <!-- 分页 -->
    <a-pagination
      v-if="props.pagination"
      class="table-pagination"
      v-model:current="current"
      v-model:pageSize="pageSize"
      size="small"
      show-size-changer
      :total="props.total"
      @change="pageChange"
      :show-total="(total) => `共 ${total} 条`"
    />
  </div>
</template>
<script setup>
const emit = defineEmits(["pageChange"]);
const props = defineProps({
  total: {
    type: [Number, String],
    default: 0,
  },
  current: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 20,
  },
  pagination: {
    type: Boolean,
    default: true,
  },
  class: {
    type: String,
    default: "",
  },
  style: {
    type: Object,
  },
  showExpanded: {
    type: Boolean,
    default: false,
  },
});
const mTableRef = ref();

const current = ref(props.current);
const pageSize = ref(props.pageSize);

const scroll = reactive({
  scrollToFirstRowOnChange: true,
  y: null,
});
// 确定滚动高度
const resetScrollY = () => {
  let subNum = 0;
  if (props.pagination) subNum = 80;
  scroll.y = mTableRef.value.clientHeight - subNum;
};

onMounted(resetScrollY);
onActivated(resetScrollY);
onDeactivated(() => (window.onresize = null));
onBeforeUnmount(() => (window.onresize = null));

window.onresize = resetScrollY;

const tableHeight = computed(() => {
  return scroll.y - 50 + "px";
});

function pageChange(pageNumber, pageSize) {
  emit("pageChange", { pageNumber, pageSize });
}
</script>
<script>
export default {
  inheritAttrs: false, // 组件自动地继承 attribute
};
</script>
<style lang="scss" scoped>
.m-table {
  height: 100%;
  flex: 1;
  position: relative;
  overflow: hidden;
  .a-table {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 40px;
  }
  .table-pagination {
    text-align: right;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
  :deep(.ant-table-wrapper) {
    .ant-spin-nested-loading,
    .ant-spin-container,
    .ant-table,
    .ant-table-container,
    .ant-table-body {
      height: 100%;
      overflow: overlay !important;
    }
    .ant-table-container {
      display: flex;
      flex-direction: column;
      .ant-table-header {
        flex-shrink: 0;
        flex-grow: 0;
      }
    }
    .ant-table-cell.ant-table-cell-fix-right.ant-table-cell-fix-right-first {
      right: 0 !important;
    }
    tr.ant-table-row {
      td:first-child {
        padding-left: 24px;
      }
      td:last-child {
        padding-right: 24px;
      }
    }
    thead.ant-table-thead {
      tr {
        th:first-child {
          padding-left: 24px;
        }
        th:nth-last-child(2) {
          padding-right: 24px;
        }
      }
    }
    .ant-empty.ant-empty-normal {
      height: v-bind(tableHeight);
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0;
      min-height: 80px;
    }
    .ant-table-selection-col {
      width: 50px !important;
    }
  }
}
</style>
