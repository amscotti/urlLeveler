const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const morgan = require("morgan");
const Database = require("./lib/database.js");
const Shortener = require("./lib/shortener.js");
const apiModule = require("./lib/api.js");
const schemaModule = require("./lib/schema.js");

const database = new Database();
const shortener = new Shortener(database);

const apiRouter = apiModule(shortener);
const schema = schemaModule(shortener);

const app = express();

// Logging
app.use(morgan("tiny"));

// REST API
app.use("/api", apiRouter);

// GraphQL API
app.use("/graphql", createHandler({ schema }));

// Based URL for redirects
app.get("/:id", async (req, res) => {
  try {
    const { url } = await shortener.getURL(req.params.id);
    res.redirect(url);
  } catch (err) {
    res
      .status(404)
      .send({ error: `Key ${req.params.id} not found in database` });
  }
});

const port = process.env.PORT || 8000;
app.listen(port);
console.log(`Server running on port ${port}`);
