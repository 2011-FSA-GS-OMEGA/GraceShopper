const router = require('express').Router()
const {Cart, Product, User} = require('../db/models')
module.exports = router

// GET /api/cart
router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByPk
    const cart = await Cart.getUsersCart(req.params.id)
    res.send(cart)
  } catch (err) {
    next(err)
  }
})

// POST /api/cart
router.post('/', async (req, res, next) => {
  try {
    const cart = await Cart.create(req.body, {
      userId: req.params.id
    })
    res.send(cart)
  } catch (err) {
    next(err)
  }
})

// PUT /api/cart
// router.put('/:id', async (req, res, next) => {
//   try {
//     const item = await Product.
//   } catch (err){
//     next(err);
//   }
// })
