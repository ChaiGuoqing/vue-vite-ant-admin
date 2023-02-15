<template>
  <div class="app-container">
    <div class="search-wrap">
      <a-input class="search-item input" allowClear v-model:value="query.roleName" placeholder="请输入角色名称" @change="handleQuery"></a-input>
      <a-button type="primary" class="search-item mini-btn" @click="handleQuery">
        <template #icon><SearchOutlined /></template>
        查询
      </a-button>
    </div>
    <div class="option-wrap">
      <a-button type="primary" class="mini-btn" @click="handleAdd">
        <template #icon><PlusOutlined /></template>
        新增
      </a-button>
      <a-button type="primary" class="mini-btn" :disabled="data.selectIds.length !== 1" @click="handleUpdate()">
        <template #icon> <EditOutlined /> </template>
        编辑
      </a-button>
      <a-button type="primary" class="mini-btn" danger :disabled="data.selectIds.length === 0" @click="handleDelete()">
        <template #icon> <DeleteOutlined /> </template>
        删除
      </a-button>
    </div>
    <div class="user-list">
      <MTable :row-selection="rowSelection" row-key="roleId" :dataSource="roleList" :columns="columns" :total="data.total" @pageChange="pageChange">
        <template v-slot:bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'status'">
            <a-switch v-model:checked="record.status" @click="changeStatus(record)" checkedValue="0" unCheckedValue="1" />
          </template>
          <template v-if="column.dataIndex === 'action'">
            <a-button type="link" @click="handleUpdate(record.roleId)">编辑</a-button>
            <a-button type="link" danger @click="handleDelete(record.roleId)">删除</a-button>
          </template>
        </template>
      </MTable>
    </div>
    <!-- 添加或修改人员对话框 -->
    <a-modal v-model:visible="dialog.visible" :title="dialog.title" :footer="null" width="700px">
      <a-form class="add-form" ref="formRef" :model="formData" :rules="rules" :labelCol="{ style: { width: '100px' } }">
        <a-form-item label="角色名称" name="roleName">
          <a-input allowClear v-model:value="formData.roleName" placeholder="请输入角色名称" :maxlength="30"></a-input>
        </a-form-item>
        <a-form-item label="权限字符" name="roleKey">
          <a-input
            allowClear
            v-model:value="formData.roleKey"
            placeholder="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)"
            :maxlength="30"
          ></a-input>
        </a-form-item>
        <a-form-item label="角色顺序" name="roleSort">
          <a-input-number allowClear v-model:value="formData.roleSort" placeholder="请输入角色顺序" style="width: 150px"></a-input-number>
        </a-form-item>
        <a-form-item label="状态" name="status">
          <a-radio-group v-model:value="formData.status">
            <a-radio v-for="dict in statusOptions" :key="dict.dictValue" :value="dict.dictValue">{{ dict.dictLabel }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="角色权限" name="menuIds">
          <AreaSelect class="select-region" v-model="formData.menuIds"></AreaSelect>
        </a-form-item>
        <a-form-item label="备注" name="remark">
          <a-textarea v-model:value="formData.remark" placeholder="请输入备注"></a-textarea>
        </a-form-item>
      </a-form>
      <div class="m-footer">
        <a-button @click="closeModal" size="medium">取消</a-button>
        <a-button type="primary" @click="submitForm" size="medium">确定</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { listRole, getRole, delRole, addRole, updateRole, changeRoleStatus } from "@/api/role";
import { getDicts } from "@/api/index";
import { message, Modal } from "ant-design-vue";
import { PlusOutlined, EditOutlined, SearchOutlined, DeleteOutlined } from "@ant-design/icons-vue";
// 弹窗所需数据
const data = reactive({
  total: 0,
  initPassword: 0, // 默认密码
  selectIds: [], // 选中数组
});
// 用户表格数据
const roleList = reactive([]);
// 状态数据字典
const statusOptions = ref([]);

// 表单ref
const formRef = ref();
// 表单参数
const initData = {
  roleId: "",
  roleName: "",
  roleKey: "",
  roleSort: 0,
  status: "0",
  remark: "",
  menuIds: [],
};
const formData = reactive(Object.assign({}, initData));

// 查询参数
const query = reactive({
  pageNum: 1,
  pageSize: 20,
  roleName: "",
});

const rowSelection = {
  onChange: (selectedRowKeys) => {
    data.selectIds = selectedRowKeys;
  },
};

// 表格所需要的数据
const columns = [
  { dataIndex: "roleId", title: "角色编号" },
  { dataIndex: "roleName", title: "角色名称" },
  { dataIndex: "roleSort", title: "显示顺序" },
  { dataIndex: "status", title: "状态" },
  { dataIndex: "createTime", title: "创建时间" },
  { dataIndex: "action", title: "操作", width: 120, align: "center" },
];

// 表单校验
const rules = {
  roleName: [{ required: true, message: "角色名称不能为空", trigger: "blur" }],
  roleKey: [{ required: true, message: "权限字符不能为空", trigger: "blur" }],
  roleSort: [{ required: true, message: "角色顺序不能为空", trigger: "blur" }],
};

const dialog = reactive({
  title: "新增角色",
  visible: false,
  width: "40%",
});

onMounted(() => {
  getList();
  getDicts("sys_normal_disable").then((res) => {
    statusOptions.value = res.data;
  });
});
/** 查询用户列表 */
function getList() {
  listRole(query).then((res) => {
    roleList.length = 0;
    roleList.push(...res.rows);
    data.total = res.total;
  });
}
// 用户状态修改
function changeStatus(row) {
  let text = row.status === "0-9" ? "启用" : "停用";
  Modal.confirm({
    title: "警告",
    content: '确认要"' + text + '""' + row.roleName + '"用户吗?',
    centered: true,
    type: "warning",
    onOk() {
      changeRoleStatus(row.roleId, row.status).then(() => {
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
  Object.assign(formData, initData);
  dialog.visible = false;
}
/** 搜索按钮操作 */
function handleQuery() {
  query.pageNum = 1;
  getList();
}
/** 分页 */
function pageChange({ pageNumber, pageSize }) {
  query.pageNum = pageNumber;
  query.pageSize = pageSize;
  getList();
}

/** 新增按钮操作 */
function handleAdd() {
  dialog.visible = true;
  dialog.title = "添加角色";
}
/** 修改按钮操作 */
function handleUpdate(id) {
  const roleId = id || data.selectIds;
  getRole(roleId).then((res) => {
    for (const key in formData) {
      formData[key] = res.data[key];
    }
    dialog.visible = true;
    dialog.title = "修改角色";
    formData.menuIds = res.menuIds || [];
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
      delRole(userIds).then(() => {
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
    const obj = Object.assign({}, { menuCheckStrictly: true, menuIds: [] }, formData);
    if (obj.roleId) {
      updateRole(obj).then(() => {
        message.success("修改成功");
        getList();
        closeModal();
      });
    } else {
      addRole(obj).then(() => {
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
.select-region {
  height: 300px;
}
.add-form {
  padding: 20px 30px;
}
</style>
