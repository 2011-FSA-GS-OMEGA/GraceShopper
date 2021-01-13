import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {ProductCard} from './ProductCard'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('ProductCard', () => {
  let productCard

  beforeEach(() => {
    productCard = shallow(<ProductCard name="Macbook Pro" />)
  })

  it('renders the product name in an h2', () => {
    expect(productCard.find('h2').text()).to.be.equal('Macbook Pro')
  })
})
