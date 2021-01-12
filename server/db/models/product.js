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
    defaultValue: 'available',
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true
    }
  },
  condition: {
    type: Sequelize.ENUM('poor', 'new', 'used'),
    defaultValue: 'new'
  },
  rating: {
    type: Sequelize.ENUM('0', '1', '2', '3', '4', '5'),
    defaultValue: '0'
  },
  stock: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Product
