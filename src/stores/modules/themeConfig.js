import projectSetting from "@/settings/projectSetting";
// const { menuTheme, menuMode, isLogo, asideWidth, isCollapse, isTagView } = projectSetting;
const themeConfigModule = defineStore("settings", {
  namespaced: true,
  state: () => ({ ...projectSetting }),
  actions: {
    // 修改布局设置
    changeSetting(data) {
      const { key, value } = data;
      // eslint-disable-next-line no-prototype-builtins
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    },
    setState(data) {
      // const { key, value } = data;
      // eslint-disable-next-line no-prototype-builtins
      Object.keys(data).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          this[key] = data[key];
        }
      });
      // if (this.hasOwnProperty(key)) {
      //   this[key] = value;
      // }
    },
  },
});

export default themeConfigModule;
