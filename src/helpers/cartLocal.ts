import { createSharedComposable } from '@vueuse/core'
import { ref, watchEffect } from 'vue'

const createCartStorage = () => {
  const amountCart = ref<number>(0)
  const addToCart = (typeCart: string, data?: any) => {
    const cartTours = JSON.parse(localStorage.getItem('tours-cart') || '[]')
    const cartHotels = JSON.parse(localStorage.getItem('hotels-cart') || '[]')
    amountCart.value = JSON.parse(localStorage.getItem('amount-cart') || '0')
    amountCart.value++
    if (typeCart === 'tours') {
      cartTours.push(data)
      localStorage.setItem('tours-cart', JSON.stringify(cartTours))
    }
    else {
      cartHotels.push(data)
      localStorage.setItem('tours-cart', JSON.stringify(cartHotels))
    }
    localStorage.setItem('amount-cart', JSON.stringify(amountCart.value))
  }
  watchEffect(() => {
    amountCart.value = JSON.parse(localStorage.getItem('amount-cart') || '0')
  })
  return {
    amountCart,
    addToCart
  }
}
export const cartStorage = createSharedComposable(createCartStorage)