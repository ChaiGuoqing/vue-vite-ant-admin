import axios from "axios";
import { message } from "ant-design-vue";
import { getToken } from "@/utils/token";
import { ErrorCode } from "@/utils/enum";
import { tansParams } from "@/utils/index";
import { sessionCache } from "@/service/cache";
import useUserStore from "@/stores/modules/user";
// let downloadLoadingInstance;
// 是否显示重新登录
export let isRelogin = { show: false };

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // axios中请求配置有baseURL选项，表示请求URL公共部分
  timeout: 10000, // 超时
});

// request拦截器
request.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false;
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false;
    if (getToken() && !isToken) {
      // config.headers["Authorization"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers["Authorization"] = "Bearer " + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // if (isRelogin.show) {
    //   isRelogin.show = false;
    //   useUserStore().logOut();
    //   return ErrorCode[401];
    // }
    // get请求映射params参数
    if (config.method === "get" && config.params) {
      let url = config.url + "?" + tansParams(config.params);
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    if (!isRepeatSubmit && ["post", "put"].includes(config.method)) {
      const requestObj = {
        url: config.url,
        data: typeof config.data === "object" ? JSON.stringify(config.data) : config.data,
        time: new Date().getTime(),
      };
      const sessionObj = sessionCache.get("sessionObj");
      if ([undefined, null, ""].includes(sessionObj)) {
        sessionCache.set("sessionObj", requestObj);
      } else {
        const { url, data, time } = sessionObj; // 请求地址  请求数据 请求时间
        const interval = 1000; // 间隔时间(ms)，小于此时间视为重复提交
        if (data === requestObj.data && requestObj.time - time < interval && requestObj.url === url) {
          const msg = "数据正在处理，请勿重复提交";
          return Promise.reject(new Error(msg));
        } else {
          sessionCache.set("sessionObj", requestObj);
        }
      }
    }
    return config;
  },
  (error) => {
    console.error(error);
    Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 0;
    // 获取错误信息
    const msg = res.data.msg || ErrorCode[code] || ErrorCode["default"];
    // 二进制数据则直接返回
    if (["blob", "arraybuffer"].includes(res.request.responseType)) {
      return res.data;
    }
    if (code == 0 || code == 200) {
      return Promise.resolve(res.data);
    } else if (code === 401) {
      if (!isRelogin.show) {
        message.warn(msg);
        isRelogin = false;
        useUserStore()
          .logOut()
          .then(() => {
            location.href = "/index";
          });
      }
      return Promise.reject(msg);
    } else {
      isRelogin.show = false;
      message.error(msg);
      return Promise.reject(msg);
    }
  },
  (error) => {
    let { message: msg, response } = error;
    // 如果response返回msg，那就弹出msg
    if (response?.data?.msg) {
      message.error(response.data.msg);
      return Promise.reject(error);
    }
    if (msg) {
      if (msg == "Network Error") {
        msg = "后端接口连接异常";
      } else if (msg.includes("timeout")) {
        msg = "系统接口请求超时";
      } else if (msg.includes("request failed with status code")) {
        msg = "系统接口" + msg.substr(msg.length - 3) + "异常";
      }
      message.error(msg);
    } else {
      // 处理断网的情况
      if (!window.navigator.onLine) {
        // store.commit("changeNetwork", false);
        message.error("网络请求超时，请检查网络后重试");
      }
    }
    console.error("接口错误：" + error);
    return Promise.reject(error);
  }
);

export default request;
