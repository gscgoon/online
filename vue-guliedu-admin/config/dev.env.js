'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://localhost:9001"',
  BASE_API: '"http://localhost:8008"',//spring gateway 网关访问端口
  //初始化头像
  // OSS_PATH: '"https://gulixueyuan-super.oss-cn-beijing.aliyuncs.com"' 提交代码时需要注释掉/写个错误的地址
  OSS_PATH: '"https://gulixueyuan-super.oss-cn-beijing.aliyuncs.com"'
})
