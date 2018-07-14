const shortId = require('shortid')

module.exports = db => {
  return {
    'addURL': url => {
      const key = shortId.generate()
      const data = { key: key, url: url }
      return db.create(key, data).then(() => data)
    },
    'getURL': key => db.read(key),
    'delURL': key => {
      return db.read(key).then((data) => db.delete(key).then(() => data))
    }
  }
}
