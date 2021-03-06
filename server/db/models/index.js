const User = require('./user')
const Cart = require('./cart')
const Product = require('./product')
const {Session} = require('express-session')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Cart.belongsTo(User)
User.hasOne(Cart)

Cart.belongsToMany(Product, {through: 'Cart_Product'})
Product.belongsToMany(Cart, {through: 'Cart_Product'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Cart,
  Product
}
