const router = require('express').Router()
const User = require('../db/models/user')
const Cart = require('../db/models/cart')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      const cart = await Cart.findOne({where: {userId: user.id, isPaid: false}})
      const browserCart = req.body.cart
      let newCart = Object.values(cart.product)
      newCart.forEach(item => {
        if (browserCart.product[item[0].id]) {
          browserCart.product[item[0].id][1] += item[1]
        } else {
          browserCart.product[item[0].id] = item
        }
        browserCart.totalPrice += item[1] * item[0].totalPrice
        browserCart.quantity += item[1]
      })
      await cart.update(browserCart)
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    const cart = req.body.cart
    await Cart.create({
      userId: user.id,
      product: cart.product,
      quantity: cart.quantity,
      totalPrice: cart.totalPrice
    })
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
