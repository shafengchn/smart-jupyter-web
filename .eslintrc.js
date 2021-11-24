module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    "arrow-parens": "off",
    "generator-star-spacing": "off",
    "no-console": process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // 关闭语句强制分号结尾
    "semi": 0,
    // 引号类型 `` "" ''
    "quotes": [1, "double"],
    "no-unused-vars": "off",
    //关闭禁止混用tab和空格
    "no-mixed-spaces-and-tabs": 'off',
	  "linebreak-style": "off",
	  "no-empty": "off",
    // "indent": ["error", 2]
  }
}
