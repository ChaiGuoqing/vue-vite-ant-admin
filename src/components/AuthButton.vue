<template>
  <div class="zx_button">
    <template v-if="type.length <= 3 && type.length > 0">
      <el-button
        :size="size"
        :disabled="isDisabled"
        type="primary"
        :plain="isPlain"
        @click="$emit('zxClick')"
        :loading="isLoading"
        v-if="type === 'xz'"
        icon="el-icon-plus"
        >新增</el-button
      >
      <el-button
        :size="size"
        :disabled="isDisabled"
        type="default"
        :plain="isPlain"
        @click="$emit('zxClick')"
        :loading="isLoading"
        v-if="type === 'cz'"
        icon="el-icon-refresh-right"
        >重置</el-button
      >
      <el-button
        :size="size"
        :disabled="isDisabled"
        type="danger"
        :plain="isPlain"
        @click="$emit('zxClick')"
        :loading="isLoading"
        v-if="type === 'sc'"
        icon="el-icon-delete"
        >刪除</el-button
      >
      <el-button
        :size="size"
        :disabled="isDisabled"
        type="primary"
        :plain="isPlain"
        @click="$emit('zxClick')"
        :loading="isLoading"
        v-if="type === 'cx'"
        icon="el-icon-search"
        >查询</el-button
      >
      <el-button :size="size" :disabled="isDisabled" type="info" :plain="isPlain" @click="$emit('zxClick')" :loading="isLoading" v-if="type === 'qx'"
        >取消</el-button
      >
      <el-button
        :size="size"
        :disabled="isDisabled"
        type="default"
        :plain="isPlain"
        @click="$emit('zxClick')"
        :loading="isLoading"
        v-if="type === 'gb'"
        >关闭</el-button
      >
      <el-button
        :size="size"
        :disabled="isDisabled"
        type="success"
        :plain="isPlain"
        @click="$emit('zxClick')"
        :loading="isLoading"
        v-if="type === 'bj'"
        icon="el-icon-edit"
        >编辑</el-button
      >
      <el-button
        :size="size"
        :disabled="isDisabled"
        type="primary"
        :plain="isPlain"
        @click="$emit('zxClick')"
        :loading="isLoading"
        v-if="type === 'bc'"
        >保存</el-button
      >
      <el-button
        :size="size"
        :disabled="isDisabled"
        type="primary"
        :plain="isPlain"
        @click="$emit('zxClick')"
        :loading="isLoading"
        v-if="type === 'qd'"
        >确定</el-button
      >
      <el-button
        :size="size"
        :disabled="isDisabled"
        type="warning"
        :plain="isPlain"
        @click="$emit('zxClick')"
        :loading="isLoading"
        v-if="type === 'dc'"
        icon="el-icon-download"
        >导出</el-button
      >
      <el-button
        :size="size"
        :disabled="isDisabled"
        type="info"
        :plain="isPlain"
        @click="$emit('zxClick')"
        :loading="isLoading"
        v-if="type === 'dr'"
        icon="el-icon-upload2"
        >导入</el-button
      >
    </template>
    <!-- 特殊按鈕，只有特殊按鈕才有text字段 -->
    <template v-if="type.length > 3">
      <el-button
        :size="size"
        :round="isRound"
        :disabled="isDisabled"
        :icon="icon"
        :plain="isPlain"
        :type="type"
        @click="$emit('zxClick')"
        :loading="isLoading"
      >
        <slot name="text"></slot>
        <slot></slot>
      </el-button>
    </template>
  </div>
</template>

<script>
/**
 * 公共按钮
 * @module 组件存放位置
 * @desc 公共按钮 统一按钮全部样式
 * @author 王志鹏
 * @date 2022年6月22日
 * @param {Object} type 普通按钮一律简写
 *                               xz 新增,
 *                               cz 重置,
 *                               sc 删除,
 *                               cx 查询,
 *                               qx 取消,
 *                               gb 关闭,
 *                               bj 编辑
 *                               bc 保存
 *                               qd 确定
 *                               dc: 导入
 *                               dr: 导出
 * @param {Object} type  当参数大于3 以上使用自定义按钮
 *                                    primary:主要按钮 ,
 *                                    success:成功,
 *                                    info:信息按钮,
 *                                    warning:警告按钮,
 *                                    danger:危险按钮,
 *                                    text:文字按钮,
 *                                    default:空白色
 * @example 调用示例
 *  <zx-button type="xz"></zx-button> || <zx-button type="primary"><span slot="text">自定义按钮名称</span></zx-button>
 **/
export default {
  name: "zx_button",
  data() {
    return {};
  },
  props: {
    type: {
      type: String,
      required: true,
      default: "zx",
    },
    size: {
      //按钮大小
      type: String,
      default: "mini",
    },
    // 按钮是否禁用   true禁用   false不禁用
    isDisabled: {
      type: Boolean,
      default: false,
    },
    // 按钮是否使用圆角按钮   true使用   false不使用   仅特殊按钮采用当前字段
    isRound: {
      type: Boolean,
      default: false,
    },
    // 按钮是否加载   true不禁用   false禁用
    isLoading: {
      type: Boolean,
      default: false,
    },
    icon: {
      //按钮图标
      type: String,
      default: "",
    },
    isPlain: {
      //是否朴素按钮   默认不使用   true使用   false不适用
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.zx_button {
  display: inline-block;
  .el-button {
    border-radius: 15px;
  }
}
.zx_button + .zx_button {
  margin-left: 10px;
}

.el-button.is-disabled {
  border: 1px solid #b0b0b0 !important;
  color: #ffffff !important;
  background-color: #b0b0b0 !important;
}
.el-button.is-disabled:hover {
  border: 1px solid #b0b0b0 !important;
  color: #ffffff !important;
  background-color: #b0b0b0 !important;
}

/* 修改button 颜色 */
.el-button--primary {
  background-color: #0c89fd;
  border-color: #0c89fd;
}
.el-button--success {
  background-color: #26d27a;
  border-color: #26d27a;
}
.el-button--danger {
  background-color: #ff503a;
  border-color: #ff503a;
}
.el-button--info {
  background-color: #b8c4d1;
  border-color: #b8c4d1;
}
.el-button--warning {
  background-color: #ff9d3a;
  border-color: #ff9d3a;
}
</style>
