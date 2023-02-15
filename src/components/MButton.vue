<template>
  <button
    :type="htmlType"
    :disabled="disabled"
    class="m-button"
    :class="[btnClass, disabled ? 'm-btn-disabled' : '', color == 'info' ? 'm-btn-linkInfo' : '']"
    :style="{ color: color == 'info' ? '#888888' : '' }"
  >
    <span class="m-button-content">
      <SvgIcon v-if="icon" :name="icon" :size="parseInt(fontSize) - 2" style="margin-right: 4px" />
      <slot></slot>
    </span>
  </button>
</template>
<script setup>
import { ButtonColors, ButtonSize } from "@/utils/enum";
const props = defineProps({
  // button的html type
  htmlType: {
    type: String,
    default: "button",
  },
  // 图标
  icon: {
    type: String,
    default: null,
  },
  // 按钮的宽度，不能小于该尺寸按钮的最小宽度
  width: {
    type: Number,
    default: null,
  },
  // 按钮的尺寸
  size: {
    type: String,
    default: "middle",
    validator: (val) => {
      return Object.prototype.hasOwnProperty.call(ButtonSize, val);
    },
  },
  // 按钮的颜色
  color: {
    type: String,
    default: "primary",
    validator: (val) => {
      return Object.prototype.hasOwnProperty.call(ButtonColors, val);
    },
  },
  // 按钮的类型
  /**
   * text --- 文字按钮
   * dash --- 虚线按钮
   * primary --- 实心按钮
   * link --- 空心按钮
   */
  type: {
    type: String,
    default: "primary",
    validator: (val) => {
      return ["text", "dash", "primary", "link"].includes(val);
    },
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false,
  },
});
// 按钮根据不同的类型去给不同的样式
const btnClass = props.disabled ? "m-btn-disabled" : "m-btn-" + props.type;
// 按钮的颜色
const btnColor = props.disabled ? "#D7CCC4" : ButtonColors[props.color];
// 按钮的高度
const height = ButtonSize[props.size].height;
// 按钮的最小宽度
const minWidth = props.type == "text" ? 0 : ButtonSize[props.size].width;
// 按钮字体大小
const fontSize = ButtonSize[props.size].fontSize;
// 按钮的宽度
const width = props.width + "px";
// 按钮的左右padding
const padding = ButtonSize[props.size].padding;
</script>
<style lang="scss" scoped>
// .button-disabled {
//   background-color: #d7ccc4 !important;
//   cursor: not-allowed !important;
// }
.m-button {
  border: 0;
  font-size: v-bind(fontSize);
  min-width: v-bind(minWidth);
  width: v-bind(width);
  height: v-bind(height);
  border-radius: 8px;
  cursor: pointer;
  padding: 0 v-bind(padding);
  ~ .m-button {
    margin-left: 20px;
  }

  .m-button-content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.m-btn-primary {
    background-color: v-bind(btnColor);
    color: #ffffff;
    &:hover {
      opacity: 0.9;
    }
    &:active {
      opacity: 1;
    }
  }
  &.m-btn-text {
    padding: 0;
    color: v-bind(btnColor);
    background-color: transparent;
    height: auto;
    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 1;
    }
  }
  &.m-btn-link {
    border: 1px solid;
    border-color: v-bind(btnColor);
    color: v-bind(btnColor);
    background-color: transparent;
    &:hover {
      background-color: v-bind(btnColor);
      color: #ffffff;
    }
    &:active {
      color: v-bind(btnColor);
      background-color: transparent;
    }
  }
  &.m-btn-dash {
    border: 1px dashed;
    border-color: v-bind(btnColor);
    color: v-bind(btnColor);
    background-color: transparent;
    &:hover {
      opacity: 0.7;
    }
    &:active {
      opacity: 1;
    }
  }
  &.m-btn-disabled {
    background-color: #d7ccc4;
    color: #ffffff;
    cursor: not-allowed;
  }
  &.m-btn-linkInfo {
    border: 1px solid;
    border-color: v-bind(btnColor);
    color: v-bind(btnColor);
    background-color: transparent;
    &:hover {
      background-color: rgba(#fd7100, 0.1);
      border-color: rgba(#fd7100, 0.3);
      color: #fd7100 !important;
    }
    &:active {
      color: v-bind(btnColor);
      background-color: transparent;
    }
  }
}
</style>
