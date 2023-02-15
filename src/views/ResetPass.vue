<template>
  <div class="title">修改密码</div>
  <a-form class="add-form" ref="formRef" :model="formData" :rules="rules" :labelCol="{ style: { width: '100px' } }">
    <a-form-item label="旧密码" name="oldPassword">
      <a-input-password allowClear v-model:value="formData.oldPassword" placeholder="请输入旧密码" :maxlength="30"></a-input-password>
    </a-form-item>
    <a-form-item label="新密码" name="newPassword">
      <a-input-password allowClear v-model:value="formData.newPassword" placeholder="请输入新密码" :maxlength="30"></a-input-password>
    </a-form-item>
    <a-form-item label="确认密码" name="confirmPassword">
      <a-input-password allowClear v-model:value="formData.confirmPassword" placeholder="请输入确认密码"></a-input-password>
    </a-form-item>
    <div class="m-footer">
      <a-button @click="closeModal" size="medium">取消</a-button>
      <a-button type="primary" @click="submitForm" size="medium">确定</a-button>
    </div>
  </a-form>
</template>

<script setup>
import { updateUserPwd } from "@/api/user";
import useUserStore from "@/stores/modules/user";

import { message } from "ant-design-vue";

const router = useRouter();
const formRef = ref();
const formData = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const rules = {
  oldPassword: [{ required: true, message: "旧密码不能为空", trigger: "blur" }],
  newPassword: [
    { required: true, message: "新密码不能为空", trigger: "blur" },
    { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
  ],
  confirmPassword: [
    { required: true, message: "确认密码不能为空", trigger: "blur" },
    { required: true, validator: equalToPassword, trigger: "blur" },
  ],
};

function equalToPassword() {
  if (formData.newPassword !== formData.confirmPassword) {
    return Promise.reject("确认密码必须与新密码相同");
  } else {
    return Promise.resolve();
  }
}

function closeModal() {
  router.back();
}

async function submitForm() {
  await formRef.value.validateFields();
  updateUserPwd(formData.oldPassword, formData.newPassword).then(() => {
    message.success("密码修改成功，请重新登录");
    useUserStore().logOut();
  });
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 50px;
}
.add-form {
  max-width: 600px;
  margin: auto;
}
</style>
