<template>
  <v-sheet min-height="600">
    <v-tabs
      color="primary"
      align-tabs="center"
      v-model="tabWindow"
    >
      <v-tab :value="1">
        <v-icon class="mr-5" icon="mdi-compass-rose" />
        Tours
      </v-tab>
      <v-tab :value="2">
        <v-icon class="mr-5" icon="mdi-bed-outline" />
        Hotels
      </v-tab>
    </v-tabs>
    <n-dialog
      v-model="dialogBooking"
      iconToolBar="mdi-message-reply-text-outline"
      title="Confirm Booking"
      labelBtnSecond="Close"
      :oneBtn="true"
      width="350"
      @action-second="() => hanldeRoute({ name: 'booking' })"
    >
      <template #content>
        <p>{{ messageStatusPayment }}</p>
      </template>
    </n-dialog>
    <v-window v-model="tabWindow">
      <v-window-item :value="1">
        <v-container>
          <n-panel-loading :loading="loadingTours" />
          <v-row v-if="!loadingTours" class="my-5">
            <v-col
              v-for="bookItem in historyBookingTours.results"
              :key="bookItem.id"
              cols="12"
            >
              <v-card elevation="0" class="my-2">
                <v-row>
                  <v-col cols="4">
                    <n-image :src="bookItem.tour.coverPicture" />
                  </v-col>
                  <v-col>
                    <v-card-text>
                      <h2>{{ bookItem.tour.name }}</h2>
                      <div class="my-5">
                        <p class="mt-2">
                          <v-icon icon="mdi-account-multiple-outline" />
                          Số lượng:
                          <span class="mx-3 font-weight-600">{{ bookItem.bookingItems.quantity }}</span>
                        </p>
                        <p class="mt-2">
                          <v-icon icon="mdi-calendar-arrow-right" />
                          Ngày khởi hành:
                          <span class="mx-3 font-weight-600">{{ formatDate(bookItem.startDate) }}</span>
                        </p>
                        <p class="mt-2">
                          <v-icon icon="mdi-calendar-arrow-left" />
                          Ngày kết thúc:
                          <span class="mx-3 font-weight-600">{{ formatDate(bookItem.endDate) }}</span>
                        </p>
                        <p class="mt-2" v-if="bookItem.note">
                          <v-icon icon="mdi-note-text-outline" />
                          Ghi chú:
                          <span class="mx-3 font-weight-600">{{ bookItem.note }}</span>
                        </p>
                        <p class="mt-2">
                          <v-icon :icon="getIconStatus(bookItem.status)" />
                          Trạng thái:
                          <span class="mx-3 font-weight-600">{{ bookItem.status.toUpperCase() }}</span>
                        </p>
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <h4 class="animate-charcter">
                        <v-icon icon="mdi-cash-fast" class="animate-charcter" />
                        Tổng tiền: {{ formatCurrency(bookItem.totalPrice) }}
                      </h4>
                      <v-spacer />
                      <n-dialog-pay-again
                        v-model="bookItem.dialogPayment"
                        :idBooking="bookItem.id"
                      >
                        <template #action>
                          <v-btn
                            v-if="bookItem.status === 'Unpaid'"
                            class="text-none"
                            color="primary"
                            rounded
                            min-width="110"
                            variant="outlined"
                            @click="bookItem.dialogPayment = true"
                          >
                            Thanh toán
                          </v-btn>
                        </template>
                      </n-dialog-pay-again>
                      <n-dialog-review
                        v-model="bookItem.dialogReview"
                        :idBooking="bookItem.id"
                        title="Tours"
                      >
                        <template #action>
                          <v-btn
                            v-if="bookItem.status === 'Completed'"
                            class="text-none"
                            color="primary"
                            rounded
                            min-width="110"
                            variant="outlined"
                            @click="bookItem.dialogReview = true"
                          >
                            Đánh giá
                          </v-btn>
                        </template>
                      </n-dialog-review>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <n-pagination
            v-if="historyBookingTours?.results"
            class="my-5"
            v-model="pageTour"
            :length="historyBookingTours?.pageNumber"
            @change="() => getHistoryBookingTours(pageTour)"
          />
        </v-container>
      </v-window-item>
      <v-window-item :value="2">
        <v-container>
          <n-panel-loading :loading="loadingHotels" />
          <v-row v-if="!loadingHotels" class="my-5">
            <n-panel-loading :loading="loadingHotels" />
            <v-col
              v-for="hotel in historyBookingHotels.results"
              :key="hotel.id"
            >
              {{ hotel }}
            </v-col>
          </v-row>
          <n-pagination
            v-if="historyBookingHotels?.results"
            class="my-5"
            v-model="pageHotel"
            :length="historyBookingHotels?.pageNumber"
            @change="() => getHistoryBookingHotels(pageHotel)"
          />
        </v-container>
      </v-window-item>
    </v-window>
  </v-sheet>
</template>
<script lang="ts" setup>
import NImage from '@/components/NImage.vue'
import NPagination from '@/components/NPagination.vue'
import NDialog from '@/components/NDialog.vue'
import NPanelLoading from '@/components/NPanelLoading.vue'
import NDialogPayAgain from '@/components/NDialogPayAgain.vue'
import NDialogReview from '@/components/NDialogReview.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBooking } from '@/composables/useBooking'
import { convertionType } from '@/helpers/convertion'
import { hanldeRoute } from '@/helpers/loadingRoute'

const {
  pageTour,
  pageHotel,
  dialogBooking,
  loadingHotels,
  loadingTours,
  messageStatusPayment,
  historyBookingTours,
  historyBookingHotels,
  getHistoryBookingTours,
  getHistoryBookingHotels,
  callBackPayment
} = useBooking()
const { formatCurrency, getIconStatus, minDate, rangePrice, formatDate } = convertionType()
const route = useRoute()
const tabWindow = ref<number>(1)
onMounted(async() => {
  if (Object.keys(route.query).length !== 0){
    await callBackPayment(route.query)
  }
  getHistoryBookingTours()
  getHistoryBookingHotels()
})
</script>