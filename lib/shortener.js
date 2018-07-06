var db = require('./database')
var shortId = require('shortid')

module.exports = {
  'addURL': (url) => {
    return new Promise((resolve, reject) => {
      db.read(url)
        .then((val) => { resolve(val) })
        .catch((_) => {
          const key = shortId.generate()
          db.write(url, key).then(db.write(key, url)).then((val) => {
            resolve(val)
          })
        })
    })
  },
  'getURL': (key) => {
    return db.read(key)
  }
}
