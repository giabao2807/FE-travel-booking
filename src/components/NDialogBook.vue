<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-dialog
    width="70%"
    @update:modelValue="(event) => hanldeChange(event)"
  >
    <template #activator>
      <slot name="action" />
    </template>
    <v-card>
      <v-card-title class="justify-space-between">
        <h2 class="text-center ma-2">{{ propItems.titleDialog }}</h2>
        <v-timeline direction="horizontal" truncate-line="both">
          <v-timeline-item
            v-for="(n, idx) in 3"
            :key="idx"
            :icon="STEP_BOOK[idx]"
            :icon-color="step === n ? 'primary' : '#000'"
            dot-color="transparent"
          />
        </v-timeline>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item v-if="propItems.typeBook === 'tour'" :value="1">
          <v-card-text class="ml-2">
            <h2 class="mb-5">Confirm Tour Information</h2>
            <v-row>
              <v-col cols="4">
                <n-image :src="propItems.tourInfo?.coverPicture" height="250" />
                <div class="my-2">
                  <v-icon icon="mdi-clock-start" />
                  Khởi hành:
                  <strong class="mx-2">{{ propItems.tourInfo?.departure }}</strong>
                </div>
                <div class="my-2">
                  <v-icon icon="mdi-shoe-sneaker" />
                  Phương tiện di chuyển:
                  <v-icon
                    v-for="item in getTraffic(propItems.tourInfo?.traffics)"
                    :key="item.value"
                    :icon="item?.icon"
                    class="mx-2"
                  />
                </div>
                <div class="my-2">
                  <v-icon icon="mdi-weather-cloudy-clock" />
                  Thời gian:
                  <strong class="mx-2">{{ propItems.tourInfo?.totalDays }}</strong>
                </div>
              </v-col>
              <v-col>
                <div>
                  <h2>{{ propItems.tourInfo?.name }}</h2>
                </div>
                <v-row align="start" class="w-75 mt-5">
                  <v-col cols="4">
                    <v-icon icon="mdi-map-clock-outline" />
                    <strong class="mx-1">Ngày Khởi Hành</strong>
                  </v-col>
                  <v-text-field
                    v-model="bookTour.startDate"
                    :min="minDate(new Date())"
                    name="startDate"
                    type="Date"
                    color="primary"
                    density="compact"
                    variant="outlined"
                    hide-details="auto"
                    class="text-field"
                  />
                </v-row>
                <v-row align="start" class="w-75 my-1">
                  <v-col cols="4">
                    <v-icon icon="mdi-account-card-outline" />
                    <strong class="mx-1">Số Lượng</strong>
                  </v-col>
                  <n-select-quantity
                    v-model="bookTour.bookingItems[0].quantity"
                    :quantity="5"
                  />
                </v-row>
                <v-row align="start" class="w-75 my-1">
                  <v-col cols="4">
                    <v-icon icon="mdi-note-edit-outline" />
                    <strong class="mx-1">Ghi Chú (nếu có)</strong>
                  </v-col>
                  <v-textarea
                    v-model="bookTour.note"
                    variant="outlined"
                    auto-grow
                    rows="2"
                    row-height="20"
                    color="primary"
                    hide-details="auto"
                    class="text-field"
                  />
                </v-row>
              </v-col>
            </v-row>
            <v-row justify="end">
              <div class="text-h6 ma-2 animate-charcter">
                Tổng tiền:
                <strong class="mx-2">
                  {{
                    formatCurrency(
                      getPriceDiscount(propItems.tourInfo?.price, propItems.tourInfo?.couponData.discountPercent)
                        * bookTour?.bookingItems[0].quantity
                    )
                  }}
                </strong>
              </div>
            </v-row>
          </v-card-text>
        </v-window-item>
        <!-- <v-window-item v-if="propItems.typeBook === 'hotel'" :value="1">
          <v-card-text class="ml-2">
            <h2 class="mb-5">Confirm Hotel Information</h2>
            <v-row>
              <v-col cols="4">
                <v-row align="start" class="w-75 my-1">
                  <v-col cols="4">
                    <v-icon icon="mdi-note-edit-outline" />
                    <strong class="mx-1">Ghi Chú (nếu có)</strong>
                  </v-col>
                  <v-textarea
                    variant="outlined"
                    auto-grow
                    rows="2"
                    row-height="20"
                    color="primary"
                    hide-details="auto"
                    class="text-field"
                  />
                </v-row>
              </v-col>
            </v-row>
            <v-row justify="end">
              <div class="text-h6 ma-2 animate-charcter">
                Tổng tiền:
                <strong class="mx-2">
                  {{
                    formatCurrency(
                      getPriceDiscount(propItems.tourInfo?.price, propItems.tourInfo?.couponData.discountPercent)
                        * bookTour?.bookingItems[0].quantity
                    )
                  }}
                </strong>
              </div>
            </v-row>
          </v-card-text>
        </v-window-item> -->
        <v-window-item :value="2">
          <v-card-text>
            <h2 class="mx-5 mb-5">
              <v-icon icon="mdi-bank-outline" />
              Ngân Hàng Thanh toán
            </h2>
            <v-container class="height-400px overflow-y-auto">
              <v-row class="mx-2">
                <v-col cols="3" v-for="item in BANK" :key="item.value">
                  <v-card
                    :class="bookTour.bankCode === item.value ? 'bg-primary' : ''"
                    height="80"
                    width="200"
                    @click="bookTour.bankCode = item.value"
                  >
                    <v-card-text align="center">
                      <n-image
                        width="100"
                        :src="item.image"
                      />
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-window-item>
        <v-window-item :value="3">
          <v-card-text class="text-center">
            <h1 class="ma-5 font-bungee">
              <v-icon icon="mdi-alert-remove-outline" />
              Error Booking
            </h1>
            <h2 class="ma-5 font-serif"> {{ errorFeedBack?.message }}</h2>
            <span class="ma-5 font-serif">Xin lỗi vì sự bất tiện này, xin hãy thử các lựa chọn khác!</span>
          </v-card-text>
        </v-window-item>
      </v-window>

      <v-divider />

      <v-card-actions>
        <v-btn
          v-if="step > 1"
          variant="text"
          @click="step--"
        >
          Back
        </v-btn>
        <v-spacer />
        <v-btn
          v-if="step === 1"
          color="primary"
          variant="flat"
          @click="() => {
            step++
          }"
        >
          Next
        </v-btn>
        <v-btn
          v-if="step === 2"
          :disabled="!bookTour?.bankCode"
          :to="linkPayment"
          color="primary"
          variant="flat"
          @click="bookingService"
        >
          Booking
        </v-btn>
        <v-btn
          v-if="step === 3"
          color="primary"
          variant="flat"
          @click="hanldeClose"
        >
          Done
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts" setup>
import NImage from '@/components/NImage.vue'
import NSelectQuantity from './NSelectQuantity.vue'
import { defineEmits, defineProps, watchEffect, withDefaults } from 'vue'
import { BANK, STEP_BOOK } from '@/resources/mockData'
import { convertionType } from '@/helpers/convertion'
import { useBooking } from '@/composables/useBooking'

type Props = {
  titleDialog: string,
  typeBook?: 'tour' | 'hotel',
  tourInfo?: any,
  hotelInfo?: any,
}
const propItems = withDefaults(defineProps<Props>(), {
  titleDialog: '',
  typeBook: 'tour',
  tourInfo: {},
  hotelInfo: {}
})

const emit = defineEmits<{
  (event: 'update:modelValue', booking: boolean): void
}>()
const hanldeChange = (event: boolean) => {
  emit('update:modelValue', event)
}
const { formatCurrency, getPriceDiscount, minDate, getTraffic } = convertionType()
const {
  step,
  linkPayment,
  errorFeedBack,
  bookTour,
  hanldeClose,
  bookingService
} = useBooking()
watchEffect(() => {
  bookTour.value.bookingItems[0].tourId = propItems.tourInfo?.id
})
</script>