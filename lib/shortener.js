import shortId from 'shortid'

class Shortener {
  constructor (database) {
    this.database = database
  }
  addURL (url) {
    const key = shortId.generate()
    const data = { key: key, url: url }
    return this.database.create(key, data).then(() => data)
  }
  getURL (key) {
    return this.database.read(key)
  }
  delURL (key) {
    return this.database.read(key).then((data) => this.database.delete(key).then(() => data))
  }
}

export default Shortener
