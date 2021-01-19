import axios from 'axios'

const SET_CART = 'SET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const EDIT_CART = 'EDIT_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CHECKOUT_CART = 'CHECKOUT_CART'

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

const editedCart = cart => {
  return {
    type: EDIT_CART,
    cart
  }
}

const removedFromCart = cart => {
  return {
    type: REMOVE_FROM_CART,
    cart
  }
}

const checkedOutCart = cart => {
  return {
    type: CHECKOUT_CART,
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
        data.product[product.id][1] += quantity
      } else {
        data.product[product.id] = [product, quantity]
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

export const editCart = (product, quantity) => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart')
      if (data.product[product.id] < quantity) {
        let diffGreater = quantity - data.product[product.id]
        data.quantity += diffGreater
        data.totalPrice += diffGreater * product.price
      } else if (data.product[product.id] > quantity) {
        let diffLesser = data.product[product.id] - quantity
        data.quantity -= diffLesser
        data.totalPrice -= diffLesser * product.price
      }
      data.product[product.id][1] = quantity
      await axios.put('/api/cart', data)
      console.log('edited data object -->', data)
      dispatch(editedCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const removeFromCart = (product, quantity) => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart')
      data.quantity -= quantity
      data.totalPrice -= product.price * quantity
      delete data.product[product.id]
      await axios.put('/api/cart', data)
      dispatch(removedFromCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const checkoutCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart')
      data.isPaid = true
      await axios.put('/api/cart', data)
      await axios.post('/api/cart')
      const {data: newData} = await axios.get('/api/cart')
      dispatch(setCart(newData))
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
    case EDIT_CART:
      return action.cart
    case REMOVE_FROM_CART:
      return action.cart
    case CHECKOUT_CART:
      return action.cart
    default:
      return state
  }
}
