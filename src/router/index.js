import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/index.vue";
// 公共路由
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
    hidden: true,
  },
  // {
  //   path: "/register",
  //   component: () => import("@/views/register"),
  //   hidden: true,
  // },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/404"),
    hidden: true,
  },
  // {
  //   path: "/401",
  //   component: () => import("@/views/error/401"),
  //   hidden: true,
  // },
  {
    path: "",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "/index",
        component: () => import("@/views/home.vue"),
        name: "Index",
        meta: { title: "首页", icon: "dashboard", affix: true },
      },
    ],
  },
  // {
  //   path: "/user",
  //   component: Layout,
  //   hidden: true,
  //   redirect: "noredirect",
  //   children: [
  //     {
  //       path: "profile",
  //       component: () => import("@/views/system/user/profile/index"),
  //       name: "Profile",
  //       meta: { title: "个人中心", icon: "user" },
  //     },
  //   ],
  // },
];

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }; // 滚动到顶部
  },
  routes: constantRoutes,
});

// router.beforeEach(async (to, from, next) => {
//   NProgress.start();
//   if (!getToken() && to.path != "/login") return next("/login");
//   next();
// });

// router.afterEach(() => {
//   NProgress.done();
// });

export default router;
