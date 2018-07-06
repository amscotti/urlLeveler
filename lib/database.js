var level = require('level')
var path = require('path')

module.exports = ((database) => {
  return {
    'read': (key) => {
      return new Promise((resolve, reject) => {
        database.get(key, (err, data) => {
          if (err) reject(err)
          else resolve(data)
        })
      })
    },
    'write': (key, data) => {
      return new Promise((resolve, reject) => {
        database.put(key, data, (err) => {
          if (err) reject(err)
          else resolve(data)
        })
      })
    }
  }
})(level(path.join(__dirname, '../db')))
