const Promise = require('bluebird')
const request = Promise.promisifyAll(require('request'))
const methods = ['get', 'post', 'put', 'del', 'delete', 'head', 'patch']
const RequestLog = require('./src/args-log')
const requestLog = new RequestLog({filePath: '/'})

class RequestShort {
  constructor () {
    methods.forEach(method => {
      this[method] = (options) => {
        requestLog.logArgs({ args: options, type: 'request', method })
        return request[`${method}Async`](options).then(res => {
          requestLog.logArgs({ args: res.body, type: 'response', method })
          return res
        })
      }
    })
  }
}

module.exports = new RequestShort()


/*
let options = {
  url: 'https://test.bbcloud.com/administrator/auth/login',
  body: {
    name: 'admin',
    password: 'admin'
  },
  json: true
}

exports.post = options => {
  return request.postAsync(options).then(res => {
    return res
  })
}

exports.put = options => {
  return request.putAsync(options).then(res => {
    return res
  })
}
*/