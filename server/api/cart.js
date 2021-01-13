const router = require('express').Router()
const {Cart} = require('../db/models')
module.exports = router

// GET /api/cart
router.get('/:id', async (req, res, next) => {
  try {
    const cart = await Cart.getUsersCart(req.params.id)
    res.send(cart)
  } catch (err) {
    next(err)
  }
})

// POST /api/cart
router.post('/:id', async (req, res, next) => {
  try {
    const cart = await Cart.create(req.body)
    res.send(cart)
  } catch (err) {
    next(err)
  }
})
