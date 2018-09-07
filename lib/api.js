import express from 'express'
import bodyParser from 'body-parser'

module.exports = shortener => {
  const apiRouter = express.Router()

  apiRouter.use(bodyParser.urlencoded({ extended: true }))
  apiRouter.use(bodyParser.json())

  apiRouter.post('/', (req, res) => {
    shortener.addURL(req.body.url).then(data => {
      res.json(data)
    }).catch(() => {
      res.status(500).send({ error: 'Error creating URL' })
    })
  })

  apiRouter.get('/:key', (req, res) => {
    shortener.getURL(req.params.key).then(data => {
      res.json(data)
    }).catch(() => {
      res.status(404).send({ error: `Key ${req.params.key} not found in database` })
    })
  })

  apiRouter.delete('/:key', (req, res) => {
    shortener.delURL(req.params.key).then(data => {
      res.json(data)
    }).catch(() => {
      res.status(404).send({ error: `Key ${req.params.key} not found in database` })
    })
  })

  return apiRouter
}
