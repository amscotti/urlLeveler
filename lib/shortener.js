const shortId = require("shortid");

class Shortener {
  constructor(database) {
    this.database = database;
  }
  async addURL(url) {
    const key = shortId.generate();

    try {
      return this.database.create(key, url);
    } catch (err) {
      throw new Error("Database error: Failed to add URL");
    }
  }
  async getURL(key) {
    try {
      return this.database.read(key);
    } catch (err) {
      throw new Error("Database error: Failed to get URL");
    }
  }
  async delURL(key) {
    try {
      const data = await this.database.read(key);
      this.database.delete(key);
      return data;
    } catch (err) {
      throw new Error("Database error: Failed to delete URL");
    }
  }
}

module.exports = Shortener;
