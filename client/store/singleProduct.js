import axios from 'axios'

const SET_A_PRODUCT = 'SET_A_PRODUCT'

// Action Creator(s)
const setProduct = product => ({
  type: SET_A_PRODUCT,
  product
})

// Thunk Creator(s)

export const fetchProduct = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${productId}`)
      dispatch(setProduct(data))
    } catch (error) {
      console.error('Failed to GET /api/products/productId')
    }
  }
}

const initialState = {}

// 'Product' Reducer

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SET_A_PRODUCT:
      return action.product
    default:
      return state
  }
}
