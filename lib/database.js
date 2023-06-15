import { Level } from 'level'

export class Database {
  constructor () {
    this.db = new Level(new URL('../db', import.meta.url).pathname)
  }

  async create (key, url) {
    const data = { key, url }
    await this.db.put(key, JSON.stringify(data))
    return data
  }

  async read (key) {
    const data = await this.db.get(key)
    return JSON.parse(data)
  }

  async update (key, data) {
    await this.db.put(key, JSON.stringify(data))
    return data
  }

  async delete (key) {
    return await this.db.del(key)
  }
}
