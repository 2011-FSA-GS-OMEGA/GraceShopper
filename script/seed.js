'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

const products = [
  {
    name: 'Macbook Pro',
    price: 1300,
    type: 'laptop',
    status: 'available',
    imageUrl:
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202011?wid=892&hei=820&&qlt=80&.v=1603406905000',
    condition: 'new',
    rating: 5,
    stock: 100,
    description: [
      'Apple-designed M1 chip for a giant leap in CPU, GPU, and machine learning performance',
      'Get more done with up to 20 hours of battery life, the longest ever in a Mac',
      '8-core CPU delivers up to 2.8x faster performance to fly through workflows quicker than ever'
    ]
  },

  {
    name: 'Garmin Watch',
    price: 300,
    type: 'watch',
    status: 'available',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51Wzel4ZD-L._AC_SX679_.jpg',
    condition: 'like-new',
    rating: 4,
    stock: 50,
    description: [
      'Rugged GPS watch built to withstand the toughest environments',
      'Constructed to U.S. Military standard 810G for thermal, shock and water resistance (rated to 100 meters)',
      'Built-in 3-axis compass and Barometric altimeter Plus multiple global navigation satellite systems (GPS, GLONASS and galileo) support helps track in more challenging environments than GPS alone'
    ]
  },

  {
    name: 'Logitech Mouse',
    price: 40,
    type: 'peripheral',
    status: 'available',
    imageUrl:
      'https://static.bhphoto.com/images/images2500x2500/logitech_910_005270_pro_wireless_gaming_mouse_1542321546000_1442777.jpg',
    condition: 'used',
    rating: 3,
    stock: 30,
    description: [
      'Cross computer control: Game changing capacity to navigate seamlessly on 3 computers, and copy paste text, images, and files from 1 to the other using Logitech flow',
      'Dual connectivity: Use with upto 3 Windows or Mac computers via included Unifying receiver or Bluetooth Smart wireless technology',
      'Advanced ergonomic design: Perfectly sculpted, hand crafted shape supports your hand and wrist in a comfortable, natural position'
    ]
  },
  {
    name: 'Beats Headphones',
    price: 1000,
    type: 'headphones',
    status: 'available',
    imageUrl:
      'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6383/6383133_sd.jpg',
    condition: 'new',
    rating: 2,
    stock: 50,
    description: [
      'High-performance wireless Bluetooth headphones in rose gold',
      'Features the Apple W1 chip and Class 1 wireless Bluetooth connectivity',
      'With up to 40 hours of battery life, Beats Solo3 wireless is your perfect everyday headphone'
    ]
  },
  {
    name: 'USB Harddrive',
    price: 12,
    type: 'memory-storage',
    status: 'available',
    imageUrl:
      'https://static.bhphoto.com/images/images1000x1000/1548071462_1448282.jpg',
    condition: 'new',
    rating: 4,
    stock: 20,
    description: [
      'USB 3.0 and USB 2.0 Compatibility',
      'Fast data transfers',
      'Improve PC Performance'
    ]
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  await Promise.all(
    products.map(product => {
      return Product.create(product)
    })
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
