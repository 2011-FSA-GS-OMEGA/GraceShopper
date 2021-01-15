const router = require('express').Router()
const {Cart, Product, User} = require('../db/models')
module.exports = router

// GET /api/cart
router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.getUsersCart(req.user.id)
    res.send(cart)
  } catch (err) {
    next(err)
  }
})

// -- PUT -- Cart already exist so you're updating what's in the cart
router.put('/', async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.body.id) // id field on data object coming back
    await cart.update(req.body)
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
