const shortId = require('shortid')

module.exports = db => {
  return {
    'addURL': url => {
      return new Promise((resolve, reject) => {
        const key = shortId.generate()
        db.create(key, url).then(_ => resolve(key)).catch(err => reject(err))
      })
    },
    'getURL': key => db.read(key),
    'delURL': key => db.delete(key)
  }
}
