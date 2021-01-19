const CREATE_GUEST_CART = 'CREATE_GUEST_CART'
const ADD_TO_GUEST_CART = 'ADD_TO_GUEST_CART'
const EDIT_GUEST_CART = 'EDIT_GUEST_CART'
const REMOVE_FROM_GUEST_CART = 'REMOVE_FROM_GUEST_CART'
const CHECKOUT_GUEST_CART = 'CHECKOUT_GUEST_CART'

const storageCart = window.sessionStorage

const createdGuestCart = cart => {
  return {
    type: CREATE_GUEST_CART,
    cart
  }
}

const addedToGuestCart = cart => {
  return {
    type: ADD_TO_GUEST_CART,
    cart
  }
}

const editedGuestCart = cart => {
  return {
    type: EDIT_GUEST_CART,
    cart
  }
}

const removedFromGuestCart = cart => {
  return {
    type: REMOVE_FROM_GUEST_CART,
    cart
  }
}

const checkedOutGuestCart = cart => {
  return {
    type: CHECKOUT_GUEST_CART,
    cart
  }
}
export const createGuestCart = () => {
  return dispatch => {
    let guestCart = JSON.stringify({
      product: {},
      quantity: 0,
      totalPrice: 0,
      isPaid: false
    })
    storageCart.setItem('guestCart', guestCart)
    dispatch(createdGuestCart(guestCart))
  }
}

export const addToGuestCart = (product, quantity) => {
  return dispatch => {
    let guestCart = JSON.parse(storageCart.getItem('guestCart'))
    if (guestCart.product[product.id]) {
      guestCart.product[product.id][1] += quantity
    } else {
      guestCart.product[product.id] = [product, quantity]
    }
    guestCart.quantity += quantity
    guestCart.totalPrice += product.price * quantity
    storageCart.removeItem('guestCart')
    storageCart.setItem('guestCart', JSON.stringify(guestCart))
    dispatch(addedToGuestCart(guestCart))
  }
}

export const editGuestCart = (product, quantity) => {
  return dispatch => {
    let guestCart = JSON.parse(storageCart.getItem('guestCart'))

    if (guestCart.product[product.id] < quantity) {
      let diffGreater = quantity - guestCart.product[product.id]
      guestCart.quantity += diffGreater
      guestCart.totalPrice += diffGreater * product.price
    } else if (guestCart.product[product.id] > quantity) {
      let diffLesser = guestCart.product[product.id] - quantity
      guestCart.quantity -= diffLesser
      guestCart.totalPrice -= diffLesser * product.price
    }
    guestCart.product[product.id][1] = quantity
    storageCart.removeItem('guestCart')
    storageCart.setItem('guestCart', JSON.stringify(guestCart))
    dispatch(editedGuestCart(guestCart))
  }
}

const initialState = {}

export default function guestCartReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_GUEST_CART:
      return action.cart
    case ADD_TO_GUEST_CART:
      return action.cart
    case EDIT_GUEST_CART:
      return action.cart
    case REMOVE_FROM_GUEST_CART:
      return action.cart
    case CHECKOUT_GUEST_CART:
      return action.cart
    default:
      return state
  }
}
