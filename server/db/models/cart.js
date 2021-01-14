const Sequelize = require('sequelize')
const db = require('../db')
const {Product} = require('./product')

const Cart = db.define('cart', {
  product: {
    type: Sequelize.JSON,
    defaultValue: {}
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  totalPrice: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  isPaid: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

// Model functions
Cart.getUsersCart = async function(userId) {
  try {
    const usersCart = await Cart.findOne({
      where: {
        userId: userId,
        isPaid: false
      }
      // include: [
      //   {
      //     model: Product,
      //   },
      // ],
    })
    return usersCart
  } catch (err) {
    console.error(err)
  }
}

module.exports = Cart
