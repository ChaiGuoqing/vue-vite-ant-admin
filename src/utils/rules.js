import { getDataType } from "./index";
import {
  validURL,
  validAlphabets,
  validEmail,
  validBankCard,
  validMobile,
  validateTel,
  validMoney,
  isNum,
  isFloatNum,
  validPostalCode,
  isAddress,
  validfax,
  validPassword,
  validateID,
  validChinese,
  validEnglish,
  isExternal,
  validCreditCode,
  validcustoms,
} from "./validate";

const validatorEnum = {
  url: { label: "网址", reg: validURL },
  letter: { label: "字母", reg: validAlphabets },
  email: { label: "邮箱", reg: validEmail },
  bankCard: { label: "银行卡号", reg: validBankCard },
  phone: { label: "手机号", reg: validMobile },
  tel: { label: "电话", reg: validateTel },
  money: { label: "金额", reg: validMoney },
  num: { label: "整数", reg: isNum },
  floatNum: { label: "数字", reg: isFloatNum }, // 两位小数
  postcode: { label: "邮编", reg: validPostalCode },
  address: { label: "地址", reg: isAddress },
  fax: { label: "传真", reg: validfax },
  password: { label: "密码", reg: validPassword },
  ID: { label: "身份证号", reg: validateID },
  chinese: { label: "中文", reg: validChinese },
  english: { label: "英文", reg: validEnglish },
  external: { reg: isExternal },
  creditCode: { label: "统一社会信用代码", reg: validCreditCode },
  customs: { label: "海关注册号", reg: validcustoms },
};

const customValidator = {
  len: (rule) => {
    return (_ryle, value) => {
      if (value.length !== rule.len) return Promise.reject(`${rule.label}的长度是${rule.len}个字符`);
      else return Promise.resolve();
    };
  },
  max: (rule) => {
    return (_ryle, value) => {
      if (value.length > rule.max) return Promise.reject(`${rule.label}的最多输入${rule.max}个字符`);
      else return Promise.resolve();
    };
  },
  min: (rule) => {
    return (_ryle, value) => {
      if (value.length < rule.min) return Promise.reject(`${rule.label}的最少输入${rule.min}个字符`);
      else return Promise.resolve();
    };
  },
};

function _getValidator(rule) {
  if (!validatorEnum[rule.type]) {
    throw new Error("检测类型不存在，请到 validatorEnum 对象中添加");
  }
  const typeObj = Object.assign({}, validatorEnum[rule.type]);
  return (_ryle, value) => {
    if (["", undefined, null].includes(value)) {
      if (rule.required === false) {
        return Promise.resolve();
      } else {
        return Promise.reject(rule.message || `请输入${rule.label || typeObj.label}`);
      }
    } else if (!typeObj.reg(value)) {
      return Promise.reject(rule.message || `请输入正确的${rule.label || typeObj.label}`);
    } else {
      return Promise.resolve();
    }
  };
}

/**
 * 获取Form表单检测规则 rules
 * @param {object} rule 检测规则 支持 字符、字符传数组、对象 例如："email" ["email","url"]  {len:6,reuqired:false,label:"权限",trigger:"blur"“}
 * @returns  antdv的表单检测规则
 */
export function getRules(rule) {
  const ruleType = getDataType(rule);
  const rules = [];
  if (ruleType === "string") {
    // 字符形式
    rules.push({ validator: _getValidator({ type: rule }), required: true, trigger: "change" });
  } else if (ruleType == "array") {
    // 数组形式
    rule.forEach((type) => {
      rules.push({ validator: _getValidator({ type }), required: true, trigger: "change" });
    });
  } else if (ruleType == "object") {
    // 对象形式
    const { len, max, min, type, required = true, trigger = "change" } = rule;
    const item = { required, trigger };
    if (len) rules.push({ validator: customValidator.len(rule), ...item });
    if (max) rules.push({ validator: customValidator.max(rule), ...item });
    if (min) rules.push({ validator: customValidator.min(rule), ...item });
    if (type) rules.push({ validator: _getValidator(rule), ...item });
  } else return Promise.reject("参数类型错误");
  return rules;
}
