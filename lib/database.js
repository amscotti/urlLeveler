const level = require('level')
const path = require('path')

module.exports = (database => {
  return {
    'create': (key, data) => database.put(key, JSON.stringify(data)),
    'read': (key) => database.get(key).then(data => JSON.parse(data)),
    'update': (key, data) => database.put(key, JSON.stringify(data)),
    'delete': (key) => database.del(key)
  }
})(level(path.join(__dirname, '../db')))
