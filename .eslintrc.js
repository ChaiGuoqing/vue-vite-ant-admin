require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/eslint-config-prettier", "./plugins/.eslintrc-auto-import.json"],
  parserOptions: {
    ecmaVersion: "latest",
    requireConfigFile: false,
  },
  env: {
    node: true,
  },
  rules: {
    // "no-useless-escape": "off",
    "vue/multi-word-component-names": "off",
  },
};
