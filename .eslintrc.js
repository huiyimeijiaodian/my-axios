module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "indent": ["warn", 4],
    // "indent": ["error", 4],
    // "no-mixed-spaces-and-tabs": "warn",
    // "camelcase": "warn",
    // // "curly": "warn", // 
    // // "quotes": 2, // 引号 single/double
    // "quotes": ["error", "single"],
    // "semi": ["warn", "always"], // 分号结束
    // "no-floating-decimal": "warn", // 禁止省略浮点数中的0 .5 3.

  }
};
