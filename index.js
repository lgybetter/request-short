const Promise = require('bluebird')
const request = Promise.promisifyAll(require('request'))
const methods = ['get', 'post', 'put', 'del', 'delete', 'patch']
const RequestLog = require('./src/args-log')
const requestLog = new RequestLog({filePath: __dirname +　'/src/test.md'})

class RequestShort {
  static getInstance({ filePath }) {
    if (!RequestShort.instance) {
      RequestShort.instance = new RequestShort({ filePath });
      RequestShort.instance.init = -1
    }
    return RequestShort.instance
  }
  constructor ({ filePath }) {
    this.requestLog = new RequestLog({ filePath })
    methods.forEach(method => {
      this[method] = (options, desc) => {
        this.init ++;
        this.requestLog.logArgs({ args: options, type: 'req', method, desc, init: this.init })
        this.init ++;
        return request[`${method}Async`](options).then(res => {
          this.requestLog.logArgs({ args: res.body, type: 'res', method, desc, init: this.init })
          return res
        })
      }
    })
  }
}

module.exports = RequestShort.getInstance


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