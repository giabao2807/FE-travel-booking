import { readonly } from 'vue-demi'
import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'

const createLoading = () => {
  const loading = ref<boolean>(false)
  const loadingCount = ref<number>(0)

  const startLoading = () => {
    loadingCount.value++
    loading.value = true
  }

  const finishLoading = () => {
    loadingCount.value--
    if (loadingCount.value === 0) {
      loadingCount.value = 0
      loading.value = false
    }
  }

  return {
    loading: readonly(loading),
    startLoading,
    finishLoading
  }
}

export const usePanelLoading = createSharedComposable(createLoading)
