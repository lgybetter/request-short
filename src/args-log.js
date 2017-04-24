const fs = require('fs')

class RequestLog {
  constructor ({ filePath }) {
    this.filePath = filePath
  }
  logArgs ({ args, type, method }) {
    // console.log(args, type, method)
    for ( let key of Object.keys(args)) {
      console.log(key, '========>',args[key])
    }
    console.log(this.filePath)
  }
}

module.exports = RequestLog