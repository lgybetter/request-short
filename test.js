const request = require('./index')

let options = {
  url: 'https://test.bbcloud.com/administrator/auth/login',
  body: {
    name: 'admin',
    password: 'admin'
  },
  json: true
}

request.post(options)