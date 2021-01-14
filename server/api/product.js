const router = require('express').Router()
const {Product, Cart} = require('../db/models')

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
// -- POST -- Add item(s) to cart
// router.post('/', async (req, res, next) => {
//   try {
//     const updateCart = await Cart.getUsersCart(req.user.id)
//     const {quantity, product} = req.body
//     const product = await Cart.create({
//       quantity,
//       cartId: updateCart.id,
//       product
//     })
//     res.json(product)
//   } catch (error) {
//     next(error)
//   }
// })
// router.post('/', async (req, res, next) => {
//   try {
//     const newProduct = await Product.create(req.params.productId)
//     if (!newProduct) res.sendStatus(404)
//     else {
//       res.json(newProduct)
//     }
//   } catch (error) {
//     next(error)
//   }
// })

// -- DELETE -- Remove an item by id
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
// -- PUT -- Update an item by id
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
