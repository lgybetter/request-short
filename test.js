const request = require('./index')({filePath: __dirname + '/test.md', title: '粑粑云管理测试'})
const co = require('co')

let options = {
  url: 'https://test.bbcloud.com/administrator/auth/login',
  body: {
    name: 'admin',
    password: 'admin'
  },
  json: true
}

co(function* () {
  yield request.post(options, '请求管理员接口')
  yield request.post(options, '请求管理员接口2')
})
