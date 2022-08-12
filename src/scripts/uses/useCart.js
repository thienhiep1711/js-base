import { useStore } from 'vuex'

export default () => {
  const store = useStore()

  const getStateCart = (property) => {
    return store.state.cart[property]
  }

  const getGetterCart = (property) => {
    return store.getters[property]
  }

  const getCart = () => {
    return store.dispatch('cart/getCart')
  }

  const changeCart = (data) => {
    return store.dispatch('cart/updateItemQuantity', data)
  }

  const addCart = (data) => {
    return store.dispatch('cart/addToCart', data)
  }

  const removeCart = ({ id, quantity = 0 }) => {
    return store.dispatch('cart/updateItemQuantity', {
      id: id,
      quantity: quantity
    })
  }

  const refreshCart = () => {
    return store.dispatch('cart/getLineItemsData')
  }

  return {
    getCart,
    changeCart,
    addCart,
    removeCart,
    refreshCart,
    getStateCart,
    getGetterCart
  }
}
