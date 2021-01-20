const router = require('express').Router()
const {Cart, Product, User} = require('../db/models')
module.exports = router

// GET /api/cart
router.get('/', async (req, res, next) => {
  try {
    console.log('req.user --->', req.user)
    const cart = await Cart.getUsersCart(req.user.id)
    res.send(cart)
  } catch (err) {
    next(err)
  }
})

// -- PUT -- Cart already exist so you're updating what's in the cart
router.put('/', async (req, res, next) => {
  try {
    console.log('req.body --->', req.body)
    const cart = await Cart.findByPk(req.body.id) // id field on data object coming back
    await cart.update(req.body)
    console.log('modified cart --->', cart)
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    await Cart.create({
      userId: req.user.id
    })
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

router.post('/guest', async (req, res, next) => {
  try {
    await Cart.create({
      userId: null
    })
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})
