<template>
  <div class="app-container">
    <div class="search-wrap">
      <a-input class="search-item input" allowClear v-model:value="query.userName" placeholder="请输入用户名称" @change="handleQuery"></a-input>
      <a-input class="search-item input" allowClear v-model:value="query.phonenumber" placeholder="请输入手机号码" @change="handleQuery"></a-input>
      <a-select class="search-item select" v-model:value="query.status" placeholder="请选择用户状态" allowClear @change="handleQuery">
        <a-select-option v-for="dict in statusOptions" :key="dict.dictValue">{{ dict.dictLabel }}</a-select-option>
      </a-select>
      <a-range-picker class="search-item date" clearable v-model:value="dateRange" allowClear value-format="YYYY-MM-DD" @change="handleQuery" />
      <a-button type="primary" class="search-item mini-btn" @click="handleQuery">
        <template #icon><SearchOutlined /></template>
        查询
      </a-button>
      <a-button @click="resetQuery" class="mini-btn">
        <template #icon><UndoOutlined /></template>
        重置
      </a-button>
    </div>
    <div class="option-wrap">
      <a-button type="primary" @click="handleAdd" class="mini-btn">
        <template #icon><PlusOutlined /></template>
        新增
      </a-button>
      <a-button type="primary" :disabled="data.selectIds.length !== 1" @click="handleUpdate()" class="mini-btn">
        <template #icon> <EditOutlined /> </template>
        编辑
      </a-button>
      <a-button type="primary" danger :disabled="data.selectIds.length === 0" @click="handleDelete()" class="mini-btn">
        <template #icon> <DeleteOutlined /> </template>
        删除
      </a-button>
    </div>
    <div class="user-list">
      <MTable :row-selection="rowSelection" row-key="userId" :dataSource="userList" :columns="columns" :total="data.total" @pageChange="pageChange">
        <template v-slot:bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'status'">
            <a-switch v-model:checked="record.status" @click="changeStatus(record)" checkedValue="0" unCheckedValue="1" />
          </template>
          <template v-if="column.dataIndex === 'action'">
            <a-button type="link" @click="handleUpdate(record.userId)">编辑</a-button>
            <a-button type="link" danger @click="handleDelete(record.userId)">删除</a-button>
          </template>
        </template>
      </MTable>
    </div>
    <!-- 添加或修改人员对话框 -->
    <a-modal v-model:visible="dialog.visible" :title="dialog.title" :footer="null" width="700px">
      <a-form class="add-form" ref="formRef" :model="formData" :rules="rules" :labelCol="{ style: { width: '100px' } }">
        <a-row>
          <a-col :span="12">
            <a-form-item label="用户昵称" name="nickName">
              <a-input allowClear v-model:value="formData.nickName" placeholder="请输入用户昵称" :maxlength="30"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="手机号码" name="phonenumber">
              <a-input v-model:value="formData.phonenumber" placeholder="请输入手机号码" :maxlength="11" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="邮箱" name="email">
              <a-input v-model:value="formData.email" placeholder="请输入邮箱" :maxlength="50" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="12" v-if="!formData.userId">
            <a-form-item label="用户名称" name="userName">
              <a-input v-model:value="formData.userName" placeholder="请输入用户名称" :maxlength="30" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="12" v-if="!formData.userId">
            <a-form-item label="用户密码" name="password">
              <a-input-password v-model:value="formData.password" placeholder="请输入用户密码" :maxlength="20" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="用户性别" name="sex">
              <a-select v-model:value="formData.sex" placeholder="请选择用户性别" style="width: 100%" allowClear>
                <a-select-option v-for="dict in sexOptions" :key="dict.dictValue">{{ dict.dictLabel }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="状态" name="status">
              <a-radio-group v-model:value="formData.status">
                <a-radio v-for="dict in statusOptions" :key="dict.dictValue" :value="dict.dictValue">{{ dict.dictLabel }}</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="角色" name="roleIds">
              <a-select v-model:value="formData.roleIds" mode="tags" placeholder="请选择角色" style="width: 100%" allowClear>
                <a-select-option v-for="item in roleOptions" :key="item.roleId" :disabled="item.status == 1">{{ item.roleName }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="备注" name="remark">
              <a-textarea v-model:value="formData.remark" placeholder="请输入备注"></a-textarea>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div class="m-footer">
        <a-button @click="closeModal" size="medium">取消</a-button>
        <a-button type="primary" @click="submitForm" size="medium">确定</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { listUser, getUser, delUser, addUser, updateUser, changeUserStatus } from "@/api/user";
import { getDicts } from "@/api/index";
import { getConfigKey } from "@/api/config";
import { message, Modal } from "ant-design-vue";
import { PlusOutlined, EditOutlined, UndoOutlined, SearchOutlined, DeleteOutlined } from "@ant-design/icons-vue";
// 弹窗所需数据
const data = reactive({
  total: 0,
  initPassword: 0, // 默认密码
  selectIds: [], // 选中数组
});
// 遮罩层
const loading = ref(true);
// 用户表格数据
const userList = reactive([]);
// 日期范围
const dateRange = ref([]);
// 状态数据字典
const statusOptions = ref([]);
// 性别状态字典
const sexOptions = ref([]);
// 角色选项
const roleOptions = ref([]);
// 表单ref
const formRef = ref();
// 表单参数
const initData = {
  userId: "",
  nickName: "",
  userName: "",
  phonenumber: "",
  email: "",
  password: "",
  sex: null,
  status: "0",
  roleIds: [],
  remark: "",
};
const formData = reactive(Object.assign({}, initData));

// 查询参数
const query = reactive({
  pageNum: 1,
  pageSize: 20,
  userName: "",
  phonenumber: "",
  status: null,
  beginTime: "",
  endTime: "",
});

const rowSelection = {
  onChange: (selectedRowKeys) => {
    data.selectIds = selectedRowKeys;
  },
};

// 表格所需要的数据
const columns = [
  { dataIndex: "userId", title: "用户编码" },
  { dataIndex: "userName", title: "用户名称" },
  { dataIndex: "nickName", title: "用户昵称" },
  { dataIndex: "phonenumber", title: "手机号码" },
  { dataIndex: "status", title: "状态" },
  { dataIndex: "createTime", title: "创建时间" },
  { dataIndex: "action", title: "操作", width: 120, align: "center" },
];

// 表单校验
const rules = {
  userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }],
  nickName: [{ required: true, message: "用户昵称不能为空", trigger: "blur" }],
  password: [
    { required: true, message: "用户密码不能为空", trigger: "blur" },
    { min: 5, max: 20, message: "用户密码长度必须介于 5 和 20 之间", trigger: "blur" },
  ],
  email: [{ type: "email", message: "请输入正确的邮箱地址", trigger: ["change"] }],
  phonenumber: [{ pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }],
};

const dialog = reactive({
  title: "新增用户",
  visible: false,
  width: "40%",
});

onMounted(() => {
  getList();
  getDicts("sys_normal_disable").then((res) => {
    statusOptions.value = res.data;
  });
  getDicts("sys_user_sex").then((res) => {
    sexOptions.value = res.data;
  });
  // 获取默认密码
  getConfigKey("sys.user.initPassword").then((res) => {
    data.initPassword = res.msg;
  });
});
/** 查询用户列表 */
function getList() {
  loading.value = true;
  // dateRange
  query.beginTime = dateRange.value && dateRange.value[0];
  query.endTime = dateRange.value && dateRange.value[1];
  listUser(query).then((res) => {
    userList.length = 0;
    userList.push(...res.rows);
    data.total = res.total;
    loading.value = false;
  });
}
// 用户状态修改
function changeStatus(row) {
  let text = row.status === "0-9" ? "启用" : "停用";
  Modal.confirm({
    title: "警告",
    content: '确认要"' + text + '""' + row.userName + '"用户吗?',
    centered: true,
    type: "warning",
    onOk() {
      changeUserStatus(row.userId, row.status).then(() => {
        message.success("设置成功");
      });
    },
    onCancel() {
      row.status = row.status === "0" ? "1" : "0";
    },
  });
}
// 关闭弹窗
function closeModal() {
  formRef.value.resetFields();
  dialog.visible = false;
}
/** 搜索按钮操作 */
function handleQuery() {
  query.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  query.userName = "";
  query.phonenumber = "";
  query.status = null;
  dateRange.value = [];
  handleQuery();
}
function pageChange({ pageNumber, pageSize }) {
  query.pageNum = pageNumber;
  query.pageSize = pageSize;
  getList();
}

/** 新增按钮操作 */
function handleAdd() {
  Object.assign(formData, initData);
  dialog.visible = true;
  dialog.title = "添加用户";
  formData.password = data.initPassword;
  getUser().then((res) => {
    roleOptions.value = res.roles;
  });
}
/** 修改按钮操作 */
function handleUpdate(id) {
  const userId = id || data.selectIds;
  dialog.visible = true;
  dialog.title = "修改用户";

  getUser(userId).then((res) => {
    for (const key in formData) {
      formData[key] = res.data[key];
    }
    roleOptions.value = res.roles;
    formData.password = "";
    formData.roleIds = res.roleIds || [];
  });
}
/** 删除按钮操作 */
function handleDelete(id) {
  const userIds = id || data.selectIds;
  Modal.confirm({
    title: "警告",
    content: '是否确认删除用户编号为"' + userIds + '"的数据项?',
    centered: true,
    type: "warning",
    onOk() {
      delUser(userIds).then(() => {
        getList();
        message.success("删除成功");
      });
    },
    onCancel() {},
  });
}

/** 提交按钮 */
function submitForm() {
  formRef.value.validateFields().then(() => {
    if (formData.userId) {
      const obj = Object.assign({}, formData);
      delete obj.password;
      updateUser(obj).then(() => {
        message.success("修改成功");
        getList();
        closeModal();
      });
    } else {
      addUser(formData).then(() => {
        message.success("新增成功");
        getList();
        closeModal();
      });
    }
  });
}
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.option-wrap {
  padding: 10px 0;
}
.user-list {
  flex: 1;
}
.search-item {
  margin-right: 20px;
  margin-bottom: 10px;
  &.input {
    width: 150px;
  }
  &.select {
    width: 150px;
  }
  &.date {
    width: 250px;
  }
}
.add-form {
  padding: 20px 30px;
}
</style>
