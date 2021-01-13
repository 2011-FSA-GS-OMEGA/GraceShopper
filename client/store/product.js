import axios from 'axios'

// Action Type(s)
const SET_A_PRODUCT = 'SET_A_PRODUCT'
const SET_PRODUCTS = 'SET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

// Action Creator(s)
const setProduct = product => ({
  type: SET_A_PRODUCT,
  product
})
const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})
const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})
const deleteProduct = product => ({
  type: DELETE_PRODUCT,
  product
})
const editProduct = product => ({
  type: EDIT_PRODUCT,
  product
})

// Thunk Creator(s)
export const fetchProduct = product => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${product}`)
    dispatch(setProduct(data))
  } catch (error) {
    console.error('Failed to GET /api/products/productId')
  }
}
export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(setProducts(data))
  } catch (error) {
    console.error('Failed to GET /api/products')
  }
}
export const postProduct = (newProduct, history) => async dispatch => {
  try {
    const created = await (await axios.post('/api/products', newProduct)).data
    dispatch(addProduct(created))
    history.push(`/products/${created.id}`)
  } catch (error) {
    console.error('Failed to POST /api/products')
  }
}
export const removeProduct = product => async dispatch => {
  try {
    await axios.delete(`/api/products/${product}`)
    dispatch(deleteProduct(product))
  } catch (error) {
    console.error('Unable to DELETE /api/products/productId')
  }
}
export const updateProduct = product => async dispatch => {
  try {
    const updated = (await axios.get(`/api/products/${product.id}`, product))
      .data
    dispatch(editProduct(updated))
  } catch (error) {
    console.error('Unable to PUT /api/products')
  }
}

// 'Product' Reducer
export default function(state = [], action) {
  switch (action.type) {
    case SET_A_PRODUCT:
      return action.product
    case SET_PRODUCTS:
      return action.products
    case ADD_PRODUCT: {
      return [...state, action.product]
    }
    case DELETE_PRODUCT: {
      return state.filter(product => product.id !== action.product)
    }
    case EDIT_PRODUCT: {
      return state.map(
        product => (product.id === action.product ? action.product : product)
      )
    }
    default:
      return state
  }
}
