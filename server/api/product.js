const router = require('express').Router()
const {Product, Cart} = require('../db/models')
const adminsOnly = require('../adminsOnly')

// displaying api routes -- browser vs api request -- use 'req' to differentiate between admin/user

// -- GET -- Get all items
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})
// -- GET -- Get single item by id
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.post('/', adminsOnly, async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.put('/:productId', adminsOnly, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    await product.update(req.body)
    const updatedProduct = await Product.findByPk(req.params.productId)
    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', adminsOnly, async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.productId
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
