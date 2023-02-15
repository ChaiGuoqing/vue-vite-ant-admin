import { getUserInfo, login } from "@/api/login";
import { setToken, removeToken } from "@/utils/token";
import { localCache } from "./cache";
import router from "@/router/index";

/**
 * 登录
 * @param {String} loginName 登录
 * @param {String} password 密码
 */
export async function loginIn(data) {
  const res = await login(data);
  setToken(res.token);
  // setToken(res.data.access_token, res.data.expires_in);
  const info = await getUserInfo();
  localCache.set("user", info.user);
  return info;
}

/**
 * 退出登录
 */
export function loginOut() {
  removeToken();
  localCache.remove("user");
  router.replace("/login");
}
