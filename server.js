const express = require('express')
const morgan = require('morgan')

const db = require('./lib/database')
const shortener = require('./lib/shortener')(db)
const bodyParser = require('body-parser')

const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/get/:id', (req, res) => {
  shortener.getURL(req.params.id).then(url => {
    res.json({ key: req.params.id, url: url })
  }).catch(() => {
    res.status(404).send({ error: `Key ${req.params.id} not found in database` })
  })
})

app.get('/:id', (req, res) => {
  shortener.getURL(req.params.id).then(url => {
    res.redirect(url)
  }).catch(() => {
    res.status(404).send({ error: `Key ${req.params.id} not found in database` })
  })
})

app.post('/', (req, res) => {
  shortener.addURL(req.body.url).then(key => {
    res.json({ key: key, url: req.body.url })
  }).catch(() => {
    res.status(500).send({ error: 'Error creating URL' })
  })
})

app.delete('/:id', (req, res) => {
  shortener.getURL(req.params.id).then(url => {
    shortener.delURL(req.params.id)
    res.json({ key: req.params.id, url: url })
  }).catch(() => {
    res.status(404).send({ error: `Key ${req.params.id} not found in database` })
  })
})

const port = process.env.PORT || 8000
app.listen(port)
console.log(`Server running on port ${port}`)
