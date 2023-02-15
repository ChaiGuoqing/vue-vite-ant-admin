import request from "@/service/request";

// 获取验证码
export function loginGetCode() {
  return request({
    url: "/captchaImage",
    method: "get",
  });
}
// 用户登录
export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data: data,
  });
}
// 用户退出登录
export function logout() {
  return request({
    url: "/logout",
    method: "delete",
  });
}
/**
 * 获取用户信息
 * @returns 用户信息
 */
export function getUserInfo() {
  return request({
    url: "/getInfo",
    method: "get",
  });
}

// 获取路由
export const getRouters = () => {
  return request({
    url: "/getRouters",
    method: "get",
  });
};
