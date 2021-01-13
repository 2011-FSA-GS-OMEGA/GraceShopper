// const { expect } = require("chai")
// const db = require("../db")
// const Product = require("./product")

// describe('Sequelize Model', () => {
//   let product
//   before(() => db.sync({ force: true }))
//   beforeEach(() => {
//     product = {
//       name: 'Macbook Pro',
//       price: 1300,
//       type: 'laptop',
//       status: 'available',
//       imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202011?wid=892&hei=820&&qlt=80&.v=1603406905000',
//       condition: 'new',
//       rating: 5,
//       stock: 100,
//       description : [
//         'Apple-designed M1 chip for a giant leap in CPU, GPU, and machine learning performance',
//         'Get more done with up to 20 hours of battery life, the longest ever in a Mac',
//         '8-core CPU delivers up to 2.8x faster performance to fly through workflows quicker than ever'
//       ]
//     }
//   })
//   afterEach(() => db.sync({ force: true }))

//   it('has fields: name, price, type, status, imageUrl, condition, rating, stock, description', async () => {
//     const savedProduct = await Product.create(product)
//     expect(savedProduct.name).to.equal('Macbook Pro')
//     expect(savedProduct.price).to
//   })
// })
