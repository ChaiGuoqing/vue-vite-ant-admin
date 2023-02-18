<template>
  <div class="login-warp">
    <div class="text-warp">
      <div class="text-warp-header">
        <img src="@/assets/img/login_logo.png" alt="" />
        <div class="text-warp-header-text">登录</div>
      </div>
      <img class="text-warp-mid-img" src="@/assets/img/logo_name.png" alt="" />
      <div class="text-warp-mid-text">Integrated security management platform</div>
      <div class="text-warp-bottom-text">
        <div>Video Monitoring</div>
        <div>Fire Management</div>
        <div>Environmental Monitoring</div>
      </div>
    </div>
    <div class="login-box-warp">
      <div class="login-box-warp-header">Hi，欢迎登录ZXICE综合安防管理平台</div>
      <a-form ref="formRef" :model="loginForm" :rules="loginRules">
        <a-form-item name="username">
          <a-input placeholder="请输入用户名" v-model:value="loginForm.username" allowClear>
            <template #prefix><SvgIcon name="login-usename" style="font-size: 20px" /></template>
          </a-input>
        </a-form-item>
        <a-form-item name="password">
          <a-input-password placeholder="请输入密码" v-model:value="loginForm.password" allowClear>
            <template #prefix><SvgIcon name="login-pwd" style="font-size: 20px" /></template>
          </a-input-password>
        </a-form-item>
        <a-form-item name="code" v-if="captchaEnabled">
          <div class="code-wrap">
            <a-input placeholder="请输入验证码" style="width: 234px" v-model:value="loginForm.code" allowClear @keyup.enter="userLogin">
              <template #prefix><SvgIcon name="login-code" style="font-size: 20px" /></template>
            </a-input>
            <img class="code-img" @click="getCodeImg" :src="codeUrl" />
          </div>
        </a-form-item>
      </a-form>
      <a-checkbox v-model:checked="loginForm.rememberMe" style="color: #888888; margin-top: 4px">记住密码</a-checkbox>
      <a-button class="login-btn" @click="userLogin" :loading="loading">
        <span v-if="!loading">登 录</span>
        <span v-else>登 录 中...</span>
      </a-button>
    </div>
    <div class="login-warp-footer">
      <div class="login-warp-footer-text">
        Copyright© 2022-2023 中星智慧云企（山东）科技有限责任公司 版权所有&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;鲁ICP备15041027号-2
      </div>
    </div>
  </div>
</template>
<script setup>
import { loginGetCode } from "@/api/login";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import Cookies from "js-cookie";
import useUserStore from "@/stores/modules/user";
const userStore = useUserStore();

const loading = ref(false);
// 验证码开关
const captchaEnabled = ref(true);

const router = useRouter();
const redirect = ref(undefined);
const formRef = ref();
const loginForm = reactive({
  username: "",
  password: "",
  code: "",
  uuid: "",
  rememberMe: false,
});
const loginRules = reactive({
  username: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
  password: [{ required: true, trigger: "blur", message: "请输入您的密码" }],
  code: [{ required: true, trigger: "change", message: "请输入验证码" }],
});
const codeUrl = ref("");

async function userLogin() {
  await formRef.value.validateFields();
  loading.value = true;
  // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
  if (loginForm.rememberMe) {
    Cookies.set("username", loginForm.username, { expires: 30 });
    Cookies.set("password", encrypt(loginForm.password), { expires: 30 });
    Cookies.set("rememberMe", loginForm.rememberMe, { expires: 30 });
  } else {
    // 否则移除
    Cookies.remove("username");
    Cookies.remove("password");
    Cookies.remove("rememberMe");
  }
  userStore
    .login(loginForm)
    .then(() => {
      router.push({ path: redirect.value || "/" });
    })
    .catch((error) => {
      loading.value = true;
      // 重新获取验证码
      if (captchaEnabled.value) {
        getCodeImg();
        console.error(error);
      }
    });
}
function getCookie() {
  const username = Cookies.get("username");
  const password = Cookies.get("password");
  const rememberMe = Cookies.get("rememberMe");
  loginForm.username = username === undefined ? loginForm.username : username;
  loginForm.password = password === undefined ? loginForm.password : decrypt(password);
  loginForm.rememberMe = rememberMe === undefined ? false : Boolean(rememberMe);
}
function getCodeImg() {
  loginGetCode().then((res) => {
    captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled;
    if (captchaEnabled.value) {
      codeUrl.value = "data:image/gif;base64," + res.img;
      loginForm.uuid = res.uuid;
    }
  });
}
getCodeImg();
getCookie();
</script>
<style lang="scss" scoped>
.login-warp {
  width: 100vw;
  height: 100vh;
  background: url("@/assets/img/login_background.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  .text-warp {
    color: #ffffff;
    width: 565px;
    height: 206px;
    bottom: 43%;
    left: 16.5%;
    position: absolute;
    .text-warp-header {
      display: flex;
      align-items: center;
      img {
        width: 122px;
        height: 50px;
      }
      .text-warp-header-text {
        box-sizing: content-box;
        width: 40px;
        height: 32px;
        line-height: 32px;
        font-size: 20px;
        font-weight: 500;
        color: #ffffff;
        padding-left: 20px;
        border-left: 1px solid #ffffff;
        margin-left: 40px;
      }
    }
    .text-warp-mid-img {
      margin-top: 33px;
      width: 460px;
      height: 50px;
    }
    .text-warp-mid-text {
      margin-top: 10px;
      font-size: 27px;
      font-weight: bold;
      color: #ffffff;
    }
    .text-warp-bottom-text {
      width: 535px;
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      font-weight: 300;
      color: #ffffff;
    }
  }
  .login-box-warp {
    position: absolute;
    bottom: 24%;
    right: 16.7%;
    width: 500px;
    height: 500px;
    background: #ffffff;
    border-radius: 4px;
    padding: 52px 45px;
    .login-box-warp-header {
      height: 27px;
      font-size: 18px;
      font-weight: 500;
      color: #004bbe;
      line-height: 27px;
      margin-bottom: 37px;
    }
    :deep(.ant-input) {
      padding: 4px;
      font-size: 16px;
      &::placeholder {
        color: #888888;
      }
    }
    :deep(.ant-input-prefix) {
      color: #c6ddff;
    }
    :deep(.ant-input-affix-wrapper-focused) {
      .ant-input-prefix {
        color: #5195fb;
      }
    }
  }
  .code-wrap {
    display: flex;
    align-items: center;
  }
  .code-img {
    width: 120px;
    height: 43px;
    margin-left: 12px;
    cursor: pointer;
  }
  .login-btn {
    margin-top: 28px;
    width: 400px;
    height: 56px;
    background: #1a43f4;
    border-radius: 2px;
    font-size: 20px;
    font-weight: 400;
    color: #ffffff;
  }
  .login-warp-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
    background: url("@/assets/img/login_background_footer.png");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-warp-footer-text {
      height: 16px;
      font-size: 16px;
      font-weight: 400;
      color: #ffffff;
      line-height: 16px;
      white-space: nowrap; //禁止换行
      margin-bottom: 0;
    }
  }
}
</style>
