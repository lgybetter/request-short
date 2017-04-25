const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))

class RequestLog {
  constructor ({ filePath }) {
    this.filePath = filePath
  }

  logArgs ({ args, type, method, desc, init }) {
    if (type === 'req') {
      return this.writeFile({ data: this.reqTemplate({ args, method, desc }), init})
    }
    return this.writeFile({data: this.resTemplate({ args, method }), init})
  }

  writeFile ({ data, init }) {
    if (init === 0) {
      return fs.writeFileAsync(this.filePath, data).then(() => {
        return Promise.resolve()
      }).catch(err => {
        console.log(err)
        return Promise.reject(err)
      })
    }
    return fs.appendFileAsync(this.filePath, data).then(() => {
      return Promise.resolve()
    }).catch(err => {
      console.log(err)
      return Promise.reject(err)
    })
  }


  reqTemplate ({ args, method, desc }) {
    switch (method) {
      case 'get':
return `
### ${desc}

- URL请求链接: ${args.url}
- 请求方法: ${method}
- qs参数: 
\`\`\`
${JSON.stringify(args.qs, null, 2)}
\`\`\`
`     
      case 'post':
      case 'put':
      case 'del':
      case 'patch':
      case 'delete':
return `
### ${desc}

- URL请求链接: ${args.url}
- 请求方法: ${method}
- Body参数: 
\`\`\`
${JSON.stringify(args.body, null, 2)}
\`\`\`
`
    }
  }


  resTemplate ({ args, method }) {
    return `
- 返回参数:
\`\`\`
${JSON.stringify(args, null, 2)}
\`\`\`

---

`
  }
}

module.exports = RequestLog