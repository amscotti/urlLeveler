import level from 'level'
import path from 'path'

class Database {
  constructor () {
    this.db = level(path.join(__dirname, '../db'))
  }
  create (key, data) {
    return this.db.put(key, JSON.stringify(data))
  }
  read (key) {
    return this.db.get(key).then(data => JSON.parse(data))
  }
  update (key, data) {
    return this.db.put(key, JSON.stringify(data))
  }
  delete (key) {
    return this.db.del(key)
  }
}

export default Database
