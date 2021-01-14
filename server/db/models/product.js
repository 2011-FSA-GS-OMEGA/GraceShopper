const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('available', 'out of stock'),
    defaultValue: 'available'
  },
  imageUrl: {
    type: Sequelize.TEXT
  },
  condition: {
    type: Sequelize.ENUM('like-new', 'new', 'used'),
    defaultValue: 'new'
  },
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      isIn: [[0, 1, 2, 3, 4, 5]]
    }
  },
  stock: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
})

module.exports = Product
