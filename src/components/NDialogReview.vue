<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-dialog persistent width="50%" @update:modelValue="(event) => hanldeChange(event)">
    <template #activator>
      <slot name="action" />
    </template>
    <template #default="{ isActive }">
      <v-card class="rounded-xl">
        <v-toolbar class="px-5">
          <v-toolbar-title>
            <h4 class="font-rowdies">
              <v-icon icon="mdi-message-draw" />
              Review {{ propItems.title }}
            </h4>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text class="ma-5">
          <v-form ref="formRef">
            <v-row class="mx-2" align="center">
              <p class="text-disabled">Rate {{ propItems.title }}</p>
              <v-rating
                v-model="paramsReview.rate"
                hover
                half-increments
                color="amber"
              />
            </v-row>
            <v-divider class="ma-5" />
            <v-text-field
              v-model="paramsReview.title"
              :rules="[ruleRequired('Title Review')]"
              label="Title"
              prepend-inner-icon="mdi-alpha-a-box-outline"
              color="primary"
              hide-details="auto"
              class="text-field"
              variant="outlined"
            />
            <v-textarea
              v-model="paramsReview.content"
              :rules="[ruleRequired('Content')]"
              label="Content"
              auto-grow
              prepend-inner-icon="mdi-content-paste"
              variant="outlined"
              rows="3"
              row-height="25"
              shaped
              color="primary"
              hide-details="auto"
              class="text-field"
            />
          </v-form>
        </v-card-text>
        <v-divider />
        <v-card-actions class="mx-5 my-2">
          <v-btn
            rounded
            min-width="110"
            variant="outlined"
            class="text-none"
            prepend-icon="mdi-close-outline"
            @click="() => isActive.value = false"
          >
            Close
          </v-btn>
          <v-spacer />
          <v-btn
            rounded
            min-width="110"
            variant="outlined"
            color="primary"
            class="text-none"
            prepend-icon="mdi-cloud-arrow-up-outline"
            @click="async() => {
              const { valid } = await formRef.validate()
              if (valid) {
                postReview({ ...paramsReview, booking: propItems.idBooking })
                isActive.value = false
              }
            }"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script lang="ts" setup>
import { ref, defineEmits, defineProps, withDefaults } from 'vue'
import { useBookStore } from '@/store/booking'
import { IAddReview } from '@/libs/types/commonType'
import { useFeedBack } from '@/composables/useFeedBack'
import { validations } from '@/helpers/validate'
import { useBooking } from '@/composables/useBooking'

type Props = {
  idBooking: string,
  title: string,
}
const propItems = withDefaults(defineProps<Props>(), {
  idBooking: '',
  title: ''
})
const { feedBack } = useFeedBack()
const {
  ruleRequired
} = validations()
const {
  getHistoryBookingTours,
  getHistoryBookingHotels
} = useBooking()
const emit = defineEmits<{
  (event: 'update:modelValue', booking: boolean): void
}>()
const hanldeChange = (event: boolean) => {
  emit('update:modelValue', event)
}
const bookStore = useBookStore()
const paramsReview = ref<IAddReview>({
  rate: 0,
  title: '',
  content: ''
})
const formRef = ref()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postReview = (params: any) => {
  bookStore.postReview(params).then(() => {
    getHistoryBookingTours()
    getHistoryBookingHotels()
    feedBack({
      title: 'Đánh giá Trải Nghiệm',
      message: 'Đánh giá thành công',
      type:'success'
    })
  }).catch(error => {
    feedBack({
      title: 'Đánh giá Trải Nghiệm',
      message: error.data,
      type:'error'
    })
  })
  paramsReview.value = {
    rate: 0,
    title: '',
    content: ''
  }
}
</script>