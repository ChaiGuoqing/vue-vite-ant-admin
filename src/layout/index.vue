<template>
  <a-layout class="layout-container">
    <Aside></Aside>
    <a-layout>
      <Header></Header>
      <a-layout-content>
        <div class="layout-main">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup></script>
<style lang="scss" scoped></style>
