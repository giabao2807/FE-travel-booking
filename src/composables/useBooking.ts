
import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useBookStore } from '@/store/booking'
import { useLoading } from '@/composables/useLoading'
import { IError } from '@/libs/types/commonType'


const createBooking = () => {
  const bookStore = useBookStore()
  const step = ref<number>(1)
  const linkPayment = ref<string>()
  const errorFeedBack = ref<IError>()
  const dialog = ref<boolean>(false)
  const bookTour = ref<any>({
    bookingItems: [
      {
        tourId: '',
        quantity: 1
      }
    ],
    startDate: '',
    type: 2,
    bankCode: ''
  })
  const { startLoading, finishLoading } = useLoading()
  const hanldeClose = (a: any) => {
    dialog.value = false
    step.value = 1
  }
  const bookingService = async() => {
    startLoading()
    await bookStore.bookingService(bookTour.value).then((data) => {
      window.location.href = data.paymentLink
      finishLoading()
    }).catch(error => {
      errorFeedBack.value = error.data
      finishLoading()
      step.value++
    })
  }
  return {
    step,
    linkPayment,
    errorFeedBack,
    dialog,
    bookTour,
    hanldeClose,
    bookingService
  }
}
export const useBooking = createSharedComposable(createBooking)