import { computed } from 'vue'
import useCart from 'uses/useCart'

export default () => {
  const { getStateCart } = useCart()
  const cartData = computed(() => getStateCart('cart'))

  const isVariantInStock = (variant) => {
    let quantityVariant = 0
    cartData.value.items.forEach((item) => {
      if (item.id === variant.id) {
        quantityVariant += item.quantity
      }
    })
    return variant.available && ((variant.inventory_management === 'shopify' && variant.inventoryPolicy === 'deny' && quantityVariant < variant.inventoryQuantity) || (variant.inventory_management === 'shopify' && variant.inventoryPolicy === 'continue') || variant.inventory_management === null)
  }

  return {
    isVariantInStock
  }
}
