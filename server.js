const express = require('express')
const graphQLHTTP = require('express-graphql')
const morgan = require('morgan')

const db = require('./lib/database')
const shortener = require('./lib/shortener')(db)

const apiRouter = require('./lib/api')(shortener)
const schema = require('./lib/schema')(shortener)

const app = express()

// Logging
app.use(morgan('tiny'))

// REST API
app.use('/api', apiRouter)

// GraphQL API
app.use('/graphql', graphQLHTTP({
  schema,
  graphiql: !(process.env.NODE_ENV === 'production')
}))

// Based URL for redirects
app.get('/:id', (req, res) => {
  shortener.getURL(req.params.id).then(data => {
    res.redirect(data.url)
  }).catch(() => {
    res.status(404).send({ error: `Key ${req.params.id} not found in database` })
  })
})

const port = process.env.PORT || 8000
app.listen(port)
console.log(`Server running on port ${port}`)
