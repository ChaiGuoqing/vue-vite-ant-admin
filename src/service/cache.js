import { getDataType } from "@/utils/index";

/**
 * 会话级缓存
 */
export const sessionCache = {
  set(key, value) {
    if (!sessionStorage) return;
    if (key != null && value != null) {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  },
  get(key) {
    if (!sessionStorage || key == null) return null;
    const value = sessionStorage.getItem(key);
    if (value != null) return JSON.parse(value);
  },
  remove(key) {
    sessionStorage.removeItem(key);
  },
  // 检测缓存是否存在
  has(key) {
    return sessionStorage.getItem(key) ? true : false;
  },
};

/**
 * 本地缓存
 */
export const localCache = {
  set(key, value) {
    if (!localStorage) return;
    if (key != null && value != null) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },
  get(key) {
    if (!localStorage || key == null) return null;
    const value = localStorage.getItem(key);
    if (value != null) return JSON.parse(value);
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  // 检测缓存是否存在
  has(key) {
    return localStorage.getItem(key) ? true : false;
  },
  setItem(params) {
    let obj = {
      name: "",
      value: "",
      expires: "",
      startTime: new Date().getTime(),
    };
    let options = {};
    //将obj和传进来的params合并
    Object.assign(options, obj, params);
    if (options.expires) {
      //如果options.expires设置了的话
      //以options.name为key，options为值放进去
      localStorage.setItem(options.name, JSON.stringify(options));
    } else {
      //如果options.expires没有设置，就判断一下value的类型
      //如果value是对象或者数组对象的类型，就先用JSON.stringify转一下，再存进去
      if (getDataType(options.value) == "object") {
        options.value = JSON.stringify(options.value);
      }
      if (getDataType(options.value) == "array") {
        options.value = JSON.stringify(options.value);
      }
      localStorage.setItem(options.name, options.value);
    }
  },
};
