import express from 'express'

export const apiModule = (shortener) => {
  const apiRouter = express.Router()

  apiRouter.use(express.json())
  apiRouter.use(express.urlencoded({ extended: true }))

  apiRouter.post('/', async (req, res, next) => {
    try {
      if (!req.body.url) {
        throw new Error('URL cannot be null or empty')
      }
      const data = await shortener.addURL(req.body.url)
      res.json(data)
    } catch (err) {
      next({ status: 400, message: err.message || 'Error creating URL' })
    }
  })

  apiRouter.get('/:key', async (req, res, next) => {
    try {
      const data = await shortener.getURL(req.params.key)
      res.json(data)
    } catch (err) {
      next({
        status: 404,
        message: err.message || `Key ${req.params.key} not found in database`
      })
    }
  })

  apiRouter.delete('/:key', async (req, res, next) => {
    try {
      const data = await shortener.delURL(req.params.key)
      res.json(data)
    } catch (err) {
      next({
        status: 404,
        message: err.message || `Key ${req.params.key} not found in database`
      })
    }
  })

  apiRouter.use((err, req, res, next) => {
    res.status(err.status || 500).send({ error: err.message })
  })

  return apiRouter
}
