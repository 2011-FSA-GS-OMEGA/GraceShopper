/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SingleProduct from './SingleProduct'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SingleProduct', () => {
  let singleProduct
  let product = {
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
  }

  beforeEach(() => {
    singleProduct = shallow(<SingleProduct product={product} />)
  })

  it('renders the product name in an h1', () => {
    expect(singleProduct.find('h1').text()).to.be.equal('Macbook Pro')
  })

  it('renders the description in an ul', () => {
    expect(singleProduct.find('ul').text()).to.be.equal(
      'Apple-designed M1 chip for a giant leap in CPU, GPU, and machine learning performance',
      'Get more done with up to 20 hours of battery life, the longest ever in a Mac',
      '8-core CPU delivers up to 2.8x faster performance to fly through workflows quicker than ever'
    )
  })
})
