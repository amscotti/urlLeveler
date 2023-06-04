const { Level } = require("level");
const path = require("path");

class Database {
  constructor() {
    this.db = new Level(path.join(__dirname, "../db"));
  }
  async create(key, url) {
    const data = { key, url };
    await this.db.put(key, JSON.stringify(data));
    return data;
  }
  async read(key) {
    const data = await this.db.get(key);
    return JSON.parse(data);
  }
  async update(key, data) {
    await this.db.put(key, JSON.stringify(data));
    return data;
  }
  async delete(key) {
    return await this.db.del(key);
  }
}

module.exports = Database;
