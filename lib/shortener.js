const shortId = require('shortid')

module.exports = db => {
  return {
    'addURL': url => {
      return new Promise((resolve, reject) => {
        const key = shortId.generate()
        const data = { key: key, url: url }
        db.create(key, data).then(() => resolve(data)).catch(err => reject(err))
      })
    },
    'getURL': key => db.read(key),
    'delURL': key => {
      return new Promise((resolve, reject) => {
        db.read(key).then((data) => {
          db.delete(key)
          resolve(data)
        }).catch(err => reject(err))
      })
    }
  }
}
