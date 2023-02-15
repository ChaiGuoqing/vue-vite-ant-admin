<template>
  <svg class="svg-icon" aria-hidden="true" :style="{ fontSize: size + 'px' }">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>

<script setup>
const props = defineProps({
  name: { type: String, required: true },
  size: { type: [String, Number], default: "16" },
  color: { type: String, default: "" },
});
const iconName = computed(() => `#icon-${props.name}`);
</script>

<style scope lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}
</style>
