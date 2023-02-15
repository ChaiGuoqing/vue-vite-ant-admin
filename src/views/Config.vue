<template>
  <div class="app-container">
    <div class="search-wrap">
      <a-input class="search-item input" allowClear v-model:value="query.configName" placeholder="请输入参数名称" @change="handleQuery"></a-input>
      <a-button type="primary" class="search-item mini-btn" @click="handleQuery">
        <template #icon><SearchOutlined /></template>
        查询
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
      <MTable :row-selection="rowSelection" row-key="configId" :dataSource="roleList" :columns="columns" :total="data.total" @pageChange="pageChange">
        <template v-slot:bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'configType'">
            {{ record.configType == "Y" ? "是" : "否" }}
          </template>
          <template v-if="column.dataIndex === 'action'">
            <a-button type="link" @click="handleUpdate(record.configId)">编辑</a-button>
            <a-button type="link" danger @click="handleDelete(record.configId)">删除</a-button>
          </template>
        </template>
      </MTable>
    </div>
    <!-- 添加或修改人员对话框 -->
    <a-modal v-model:visible="dialog.visible" :title="dialog.title" :footer="null" width="700px">
      <a-form class="add-form" ref="formRef" :model="formData" :rules="rules" :labelCol="{ style: { width: '100px' } }">
        <a-form-item label="参数名称" name="configName">
          <a-input allowClear v-model:value="formData.configName" placeholder="请输入参数名称" :maxlength="30"></a-input>
        </a-form-item>
        <a-form-item label="参数键名" name="configKey">
          <a-input allowClear v-model:value="formData.configKey" placeholder="请输入参数键名" :maxlength="30"></a-input>
        </a-form-item>
        <a-form-item label="参数键值" name="configValue">
          <a-input allowClear v-model:value="formData.configValue" placeholder="请输入参数键值"></a-input>
        </a-form-item>
        <a-form-item label="系统内置" name="configType">
          <a-radio-group v-model:value="formData.configType">
            <a-radio v-for="dict in typeOptions" :key="dict.dictValue" :value="dict.dictValue">{{ dict.dictLabel }}</a-radio>
          </a-radio-group>
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
import { listConfig, getConfig, delConfig, addConfig, updateConfig } from "@/api/config";
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
const typeOptions = ref([]);

// 表单ref
const formRef = ref();
// 表单参数
const initData = {
  configId: "",
  configName: "",
  configKey: "",
  configValue: "",
  configType: "Y",
  remark: "",
};
const formData = reactive(Object.assign({}, initData));

// 查询参数
const query = reactive({
  pageNum: 1,
  pageSize: 20,
  configName: "",
});

const rowSelection = {
  onChange: (selectedRowKeys) => {
    data.selectIds = selectedRowKeys;
  },
};

// 表格所需要的数据
const columns = [
  { dataIndex: "configName", title: "参数名称" },
  { dataIndex: "configKey", title: "参数键名" },
  { dataIndex: "configValue", title: "参数键值" },
  { dataIndex: "configType", title: "系统内置" },
  { dataIndex: "createTime", title: "创建时间" },
  { dataIndex: "action", title: "操作", width: 120, align: "center" },
];

// 表单校验
const rules = {
  configName: [{ required: true, message: "参数名称不能为空", trigger: "blur" }],
  configKey: [{ required: true, message: "参数键名不能为空", trigger: "blur" }],
  configValue: [{ required: true, message: "参数键值不能为空", trigger: "blur" }],
};

const dialog = reactive({
  title: "新增角色",
  visible: false,
  width: "40%",
});

onMounted(() => {
  getList();
  getDicts("sys_yes_no").then((res) => {
    typeOptions.value = res.data;
  });
});
/** 查询用户列表 */
function getList() {
  listConfig(query).then((res) => {
    roleList.length = 0;
    roleList.push(...res.rows);
    data.total = res.total;
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
/** 分页 */
function pageChange({ pageNumber, pageSize }) {
  query.pageNum = pageNumber;
  query.pageSize = pageSize;
  getList();
}

/** 新增按钮操作 */
function handleAdd() {
  Object.assign(formData, initData);
  dialog.visible = true;
  dialog.title = "添加角色";
}
/** 修改按钮操作 */
function handleUpdate(id) {
  const configId = id || data.selectIds;
  getConfig(configId).then((res) => {
    for (const key in formData) {
      formData[key] = res.data[key];
    }
    dialog.visible = true;
    dialog.title = "修改角色";
    formData.postIds = res.postIds || [];
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
      delConfig(userIds).then(() => {
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
    const obj = Object.assign(
      {
        menuCheckStrictly: true,
        menuIds: [],
      },
      formData
    );
    if (obj.configId) {
      updateConfig(obj).then(() => {
        message.success("修改成功");
        getList();
        closeModal();
      });
    } else {
      addConfig(obj).then(() => {
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
