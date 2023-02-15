<template>
  <span>
    <SettingOutlined @click="showDrawer" />
    <a-drawer title="设置" placement="right" width="330" :closable="false" v-model:visible="visible" :after-visible-change="afterVisibleChange">
      <a-divider>界面功能</a-divider>
      <div class="setting-item">
        <div class="mt-16 mb-16 flex justify-between items-center">
          <span class="ml-10">折叠菜单</span>
          <a-switch :checked="themeConfig.isCollapse" @change="toggleMenu" />
        </div>
        <div class="mt-16 mb-16 flex justify-between items-center">
          <span class="ml-10">菜单展开宽度</span>
          <a-input-number
            id="inputNumber"
            v-model:value="themeConfig.asideWidth"
            :min="180"
            :max="300"
            :step="10"
            @change="(val) => changeSetting({ asideWidth: val })"
          />
        </div>
      </div>
      <a-divider>界面显示</a-divider>
      <div class="setting-item">
        <div class="mt-16 mb-16 flex justify-between items-center">
          <span class="ml-10">Logo</span>
          <a-switch :checked="themeConfig.isLogo" @change="() => changeSetting({ isLogo: !themeConfig.isLogo })" />
        </div>
        <div class="mt-16 mb-16 flex justify-between items-center">
          <span class="ml-10">菜单主题</span>
          <a-switch
            :checked="themeConfig.menuTheme === 'dark'"
            checked-children="dark"
            un-checked-children="light"
            @change="(val) => changeSetting({ menuTheme: val ? 'dark' : 'light' })"
          />
        </div>
        <div class="mt-16 mb-16 flex justify-between items-center">
          <span class="ml-10">面包屑</span>
          <a-switch
            :checked="themeConfig.isBreadCrumb"
            :checked-children="false"
            :un-checked-children="true"
            @change="(val) => changeSetting({ isBreadCrumb: val })"
          />
        </div>
        <div class="mt-16 mb-16 flex justify-between items-center">
          <span class="ml-10">标签页</span>
          <a-switch
            :checked="themeConfig.isTagView"
            :checked-children="false"
            :un-checked-children="true"
            @change="(val) => changeSetting({ isTagView: val })"
          />
        </div>
      </div>
      <a-divider />
      <div class="setting-item">
        <!-- <a-button type="primary" block class="mb-12" @click="onCopy">
          <CopyOutlined class="mr-10" />
          <span>拷贝</span>
        </a-button> -->
        <a-button type="primary" ghost block class="mb-12" @click="onReset">
          <ReloadOutlined class="mr-10" />
          <span>重置</span>
        </a-button>
      </div>
    </a-drawer>
  </span>
</template>

<script>
import { SettingOutlined, ReloadOutlined } from "@ant-design/icons-vue";
// import { useStore } from "@/store/index";
// import { Modal, message } from "ant-design-vue";
// import projectSetting from "@/settings/projectSetting";

export default defineComponent({
  components: {
    SettingOutlined,
    ReloadOutlined,
  },
  setup() {
    // const visible = ref(false);
    // const afterVisibleChange = () => {
    //   // console.log("visible", bool);
    // };
    // const showDrawer = () => {
    //   visible.value = true;
    // };
    // const store = useStore();
    // 配置信息
    // const themeConfig = computed(() => {
    //   return store.state.themeConfig;
    // });
    // 顶部导航栏控制
    // const toggleMenu = (val) => {
    //   store.commit("themeConfig/setState", {
    //     isCollapse: val,
    //     isLogo: false,
    //   });
    // };
    // layout设置
    // const changeSetting = (val) => {
    //   store.commit("themeConfig/setState", val);
    // };
    // 复制配置信息
    // const onCopy = () => {
    //   // 创建textarea标签
    //   const textarea = document.createElement("textarea");
    //   textarea.readOnly = "readonly";
    //   textarea.style.position = "fixed";
    //   textarea.style.top = "-99999px";
    //   // 把目标内容赋值给它的value属性
    //   textarea.value = JSON.stringify(themeConfig.value, null, 2);
    //   // 插入到页面
    //   document.body.appendChild(textarea);
    //   // 调用onselect()方法
    //   textarea.select();
    //   // 把目标内容复制进剪贴板, 该API会返回一个Boolean
    //   const res = document.execCommand("Copy");
    //   if (res) {
    //     Modal.success({
    //       title: "操作成功",
    //       content: "复制成功,请到 src/settings/projectSetting.js 中修改配置！",
    //       okText: "确认",
    //     });
    //   }
    // };
    // 重置配置信息
    // const onReset = () => {
    //   store.commit("themeConfig/setState", projectSetting);
    //   message.success("重置成功");
    // };
    // return {
    //   visible,
    //   afterVisibleChange,
    //   showDrawer,
    //   themeConfig,
    //   toggleMenu,
    //   changeSetting,
    //   onCopy,
    //   onReset,
    // };
  },
});
</script>

<style></style>
