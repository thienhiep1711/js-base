import { useStore } from 'vuex'

export default () => {
  const store = useStore()

  const getStateGlobal = (property) => {
    return store.state.app[property]
  }

  const getGetterGlobal = (property) => {
    return store.getters[property]
  }

  const toggleMiniCart = () => {
    return store.dispatch('toggleMiniCart')
  }

  return {
    getStateGlobal,
    getGetterGlobal,
    toggleMiniCart
  }
}
