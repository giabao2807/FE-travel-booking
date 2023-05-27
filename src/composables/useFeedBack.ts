import { createSharedComposable } from '@vueuse/core'
import { ElNotification } from 'element-plus'
import { IFeedBack } from '@/libs/types/commonType'

const createFeedBack = () => {
  const feedBack = (data: IFeedBack) => {
    ElNotification({
      title: data.title || 'Error',
      message: data.message,
      type: data.type,
      position: 'bottom-right'
    })
  }

  return {
    feedBack
  }
}
export const useFeedBack = createSharedComposable(createFeedBack)