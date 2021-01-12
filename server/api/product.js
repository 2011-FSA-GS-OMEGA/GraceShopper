const router = require('express').Router()
const {Product} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(product)
  } catch (error) {
    next(error)
  }
})
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    if (!newProduct) res.sendStatus(404)
    else {
      res.json(newProduct)
    }
  } catch (error) {
    next(error)
  }
})
router.delete('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    if (!product) res.sendStatus(404)
    else {
      await product.destroy()
      res.send(product)
    }
  } catch (error) {
    next(error)
  }
})
router.put('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.prdouctId)
    if (!product) res.sendStatus(404)
    else {
      res.send(await product.update(req.body))
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
