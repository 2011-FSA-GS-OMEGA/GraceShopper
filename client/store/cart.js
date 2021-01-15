import axios from 'axios'

const SET_CART = 'SET_CART'
const ADD_TO_CART = 'ADD_TO_CART'

const setCart = cart => {
  return {
    type: SET_CART,
    cart
  }
}

const addedToCart = cart => {
  return {
    type: ADD_TO_CART,
    cart
  }
}

export const fetchCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart')
      dispatch(setCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const addToCart = (product, quantity) => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart')
      if (data.product[product.id]) {
        data.product[product.id] += quantity
      } else {
        data.product[product.id] = quantity
      }
      data.quantity += quantity
      data.totalPrice += product.price * quantity
      await axios.put('/api/cart', data)
      dispatch(addedToCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = {}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart
    case ADD_TO_CART:
      return action.cart
    default:
      return state
  }
}
