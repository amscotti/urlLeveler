const level = require('level')
const path = require('path')

module.exports = (database => {
  return {
    'create': (key, data) => database.put(key, data),
    'read': (key) => database.get(key),
    'update': (key, data) => database.put(key, data),
    'delete': (key) => database.del(key)
  }
})(level(path.join(__dirname, '../db')))
