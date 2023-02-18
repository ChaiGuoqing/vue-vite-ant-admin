<template>
  <div class="breadcrumb-user">
    <a-dropdown :show-timeout="70" :hide-timeout="50">
      <span class="breadcrumb-user-link">
        <img :src="userStore.avatar || defaultAvatar" class="breadcrumb-user-link-photo" />
      </span>
      <template #overlay>
        <a-menu @click="onHandleCommandClick">
          <a-menu-item key="/index">
            {{ userStore.name || "test" }}
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="">个人中心</a-menu-item>
          <a-menu-item key="/logOut">退出登录</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup>
import defaultAvatar from "@/assets/img/header-user-avatar.png";
import useUserStore from "@/stores/modules/user";
import { Modal } from "ant-design-vue";
const router = useRouter();
const userStore = useUserStore();
// 下拉菜单点击时
const onHandleCommandClick = ({ key }) => {
  if (key === "/logOut") {
    Modal.confirm({
      title: "提示",
      content: "确定退出?",
      onOk: async () => {
        const currentRoute = router.currentRoute.value;
        await userStore.logOut();
        router.push(`/login?redirect=${currentRoute.fullPath}`);
      },
      onCancel() {},
    });
  } else {
    router.push(key);
  }
};
// export default {
//   setup() {
//     const store = useStore();
//     const router = useRouter();
//     // 获取用户信息 vuex
//     const userInfo = computed(() => {
//       return store.state.user.userInfo;
//     });
//     // 下拉菜单点击时
//     const onHandleCommandClick = ({ key }) => {
//       if (key === "/logOut") {
//         Modal.confirm({
//           title: "提示",
//           content: "确定退出?",
//           onOk: async () => {
//             const currentRoute = router.currentRoute.value;
//             await store.dispatch("user/logout");
//             router.push(`/login?redirect=${currentRoute.fullPath}`);
//           },
//           onCancel() {},
//         });
//       } else {
//         router.push(key);
//       }
//     };
//     return {
//       userInfo,
//       defaultAvatar,
//       onHandleCommandClick,
//     };
//   },
// };
</script>

<style scoped lang="scss">
.breadcrumb-user {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  &-link {
    height: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;
    &-photo {
      width: 25px;
      height: 25px;
      border-radius: 100%;
    }
  }
}
</style>
