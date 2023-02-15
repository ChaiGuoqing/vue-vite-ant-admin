/**
 * 判断url是否是http或https
 * @param {string} path
 * @returns {Boolean}
 */
export function isHttp(url) {
  return url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1;
}

/**
 * 判断path是否为外链
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ["admin", "editor"];
  return valid_map.indexOf(str.trim()) >= 0;
}

/**
 * 检测url
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  /* eslint-disable */
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

/**
 * @param {string} 银行卡号
 * @returns {Boolean}
 */
export function validBankCard(code) {
  const reg = /^[1-9]\d{9,29}$/;
  return reg.test(code);
}
/**
 * @param {string} 统一社会信用代码
 * @returns {Boolean}
 */
export function validCreditCode(code) {
  const reg = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/;
  return reg.test(code);
}
/**
 * @param {string} 手机号
 * @returns {Boolean}
 */
export function validMobile(code) {
  const reg = /^(1[3465789]\d{9})$/;
  return reg.test(code);
}
/**
 * @param {string} 电话(座机)验证
 * @returns {Boolean}
 */
export function validateTel(code) {
  const reg = /^(0\d{2,3}-?)?\d{7,8}$/;
  return reg.test(code);
}
/**
 * @param {string} 座机和手机
 * @returns {Boolean}
 */
export function validPhone(code) {
  const reg = /^((0\d{2,3}-?\d{7,8})|(1[3465789]\d{9}))$/;
  return reg.test(code);
}

/**
 * @param {string} 数字/货币金额（支持负数、千分位分隔符）
 * @returns {Boolean}
 */
export function validMoney(code) {
  const reg = /^-?\d+(,\d{3})*(\.\d{1,2})?$/;
  return reg.test(code);
}
/**
 * @param {string} 邮政编码(中国)
 * @returns {Boolean}
 */
export function validPostalCode(code) {
  const reg = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/;
  return reg.test(code);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === "string" || str instanceof String) {
    return true;
  }
  return false;
}

/**
 * @param {Array} 正整数
 * @returns {Boolean}
 */
export function isNum(num) {
  const reg = /^\+?[1-9]\d*$/;
  return reg.test(num);
}
/**
 * @param {Array} 两位小数
 * @returns {Boolean}
 */
export function isFloatNum(num) {
  const reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
  return reg.test(num);
}

/**
 * @param {Array} 地址校验（非纯数字）
 * @returns {Boolean}
 */
export function isAddress(address) {
  const reg = /^\d+$/;
  return !reg.test(address);
}
/**
 * @param {string} 海关注册号
 * @returns {Boolean}
 */
export function validcustoms(code) {
  const reg = /[0-9A-HJ-NPQRTUWXY]{10}/;
  return reg.test(code);
}
/**
 * @param {string} 传真
 * @returns {Boolean}
 */
export function validfax(code) {
  const reg = /^(?:\d{3,4}-)?\d{7,8}(?:-\d{1,6})?$/;
  return reg.test(code);
}

/**
 * @param {string} 6-18位 字母/数字 密码
 * @returns {Boolean}
 */
export function validPassword(code) {
  const reg = /^[a-zA-Z0-9]{6,18}$/;
  return reg.test(code);
}

/**
 * @param {string} 身份证号
 * @returns {Boolean}
 */
export function validateID(code) {
  const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  return reg.test(code);
}

/**
 * 检测是否中文
 * @param {string} 字符
 * @returns {Boolean} 是否通过检测
 */
export function validChinese(str) {
  const reg = /^(?!\s*$)[A-Za-z0-9._\-()\u4e00-\u9fa5（）\s-]+$/;
  return reg.test(str);
}

/**
 * 检测是否英文
 * @param {string} 字符
 * @returns {Boolean} 是否通过检测
 */
export function validEnglish(str) {
  const reg = /^(?!\s*$)[A-Za-z0-9._\-()（）\s-]+$/;
  return reg.test(str);
}

export function checkEmail(_rule, value) {
  if (value === "") {
    return Promise.reject("请输入邮箱！");
  } else if (!validEmail(value)) {
    return Promise.reject("请输入正确的邮箱！");
  } else {
    return Promise.resolve();
  }
}
export function checkPhone(_ryle, value) {
  if (value === "") {
    return Promise.reject("请输入手机号！");
  } else if (!validPhone(value)) {
    return Promise.reject("手机号格式错误！");
  } else {
    return Promise.resolve();
  }
}

export function checkTel(_ryle, value) {
  if (value === "") {
    return Promise.reject("请输入电话号！");
  } else if (!validateTel(value)) {
    return Promise.reject("电话号格式错误！");
  } else {
    return Promise.resolve();
  }
}
export function checkFax(_ryle, value) {
  if (value && !validfax(value)) {
    return Promise.reject("请输入正确的传真！");
  } else {
    return Promise.resolve();
  }
}
export function checkNum(_ryle, value) {
  if (!value) {
    return Promise.reject("请输入！");
  } else if (!isNum(value)) {
    return Promise.reject("请输入正整数！");
  } else {
    return Promise.resolve();
  }
}
//^[0-9]*$
export function checkFloatNum(_ryle, value) {
  if (!value) {
    return Promise.reject("请输入！");
  } else if (!isFloatNum(value)) {
    return Promise.reject("请输入大于0的数字（支持两位小数！）");
  } else {
    return Promise.resolve();
  }
}

export function checkID(_rule, value) {
  if (value === "") {
    return Promise.reject("请输入身份证号！");
  } else if (!validateID(value)) {
    return Promise.reject("身份证格式错误！");
  } else {
    return Promise.resolve();
  }
}
//校验地址
export function checkAddress(_ryle, value) {
  if (value === "") {
    return Promise.reject("请输入地址！");
  } else if (!isAddress(value)) {
    return Promise.reject("请输入正确的地址！");
  } else {
    return Promise.resolve();
  }
}

/**
 * 检测密码（6-16位 包含字母、数字、符号两种以上的组合）
 * @param {string} value 字符
 * @returns {Boolean}
 */
export function checkPassword(_ryle, value) {
  const lenReg = /^\w{6,16}$/;
  const lessReg = /([\da-zA-Z]+?[_]+?)|([_]+?[\da-zA-Z]+?)|(\d+?[a-zA-Z]+?)|([a-zA-Z]+?\d+?)/;
  if (!lenReg.test(value)) {
    return Promise.reject("请输入6-16位数密码");
  } else if (!lessReg.test(value)) {
    return Promise.reject("密码未包含字母、数字、符号两种以上的组合");
  } else {
    return Promise.resolve();
  }
}
