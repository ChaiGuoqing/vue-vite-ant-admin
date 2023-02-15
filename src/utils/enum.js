/**
 * 状态码提示信息
 */
export const ErrorCode = {
  401: "登录状态已过期，请重新登录",
  403: "当前操作没有权限",
  404: "访问资源不存在",
  default: "系统未知错误，请反馈给管理员",
};

// 按钮的颜色
export const ButtonColors = {
  primary: "#3C76FE",
  blue: "#0085ff",
  danger: "#FF6363",
  warn: "#FD7100",
  info: "#E8E8E8",
  success: "#55D8C7",
  cancel: "#888888",
  grey: "#4A4A4A",
  green: "#04BC00",
};
// 按钮的大小限制
export const ButtonSize = {
  small: {
    width: "44px",
    height: "24px",
    fontSize: "12px",
    padding: "10px",
  },
  middle: {
    width: "72px",
    height: "32px",
    fontSize: "14px",
    padding: "22px",
  },
  large: {
    width: "100px",
    height: "40px",
    fontSize: "16px",
    padding: "34px",
  },
};
