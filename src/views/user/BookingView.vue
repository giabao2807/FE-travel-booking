<template>
  <v-sheet min-height="600" class="booking-page">
    <h2 class="text-center pt-10 pb-5">
      Yours Booking History
    </h2>
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
      prependIconSecond="mdi-close-outline"
      :oneBtn="true"
      width="350"
      @action-second="() => handleRoute({ name: 'booking' })"
    >
      <template #content>
        <p>{{ messageStatusPayment }}</p>
      </template>
    </n-dialog>
    <v-window v-model="tabWindow">
      <v-window-item :value="1">
        <n-panel-not-found
          v-if="!historyBookingTours.results && !loadingTours"
          icon="mdi-timer-sand-empty"
          title="Bạn chưa booking tour du lịch nào!"
        />
        <v-container>
          <n-panel-loading :loading="loadingTours" />
          <v-row v-if="!loadingTours" class="my-5">
            <v-col
              v-for="bookItem in historyBookingTours.results"
              :key="bookItem.id"
              cols="12"
            >
              <v-card
                elevation="0"
                class="my-2 card-booking"
              >
                <v-row>
                  <v-col cols="4">
                    <n-image :src="bookItem.tour.coverPicture" class="custom-image" />
                  </v-col>
                  <v-col>
                    <v-card-text @click="() => getTourBookingDetail(bookItem.id)">
                      <h2>{{ bookItem.tour.name }}</h2>
                      <div class="my-5">
                        <p class="mt-2">
                          <v-icon icon="mdi-timeline-clock-outline" />
                          Ngày đặt:
                          <span class="mx-3 font-weight-600">{{ formatDate(bookItem.createdAt) }}</span>
                        </p>
                        <p class="mt-2">
                          <v-icon icon="mdi-account-multiple-outline" />
                          Số lượng:
                          <span class="mx-3 font-weight-600">{{ bookItem.bookingItems.quantity }}</span>
                        </p>
                        <div class="d-flex mt-2">
                          <v-icon icon="mdi-clipboard-text-clock" />
                          Ngày khởi hành/kết thúc:
                          <h4 class="mx-2">
                            {{ formatDate(bookItem.startDate) }}
                            <v-icon icon="mdi-chevron-right" />
                            {{ formatDate(bookItem.endDate) }}
                          </h4>
                        </div>
                        <p class="mt-2" v-if="bookItem.note">
                          <v-icon icon="mdi-note-text-outline" />
                          Ghi chú:
                          <span class="mx-3 font-weight-600">{{ bookItem.note }}</span>
                        </p>
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <div>
                        <h3 class="animate-charcter">
                          <v-chip class="mr-5" :color="checkColorTag(bookItem.status)">
                            <h5>
                              <v-icon :icon="getIconStatus(bookItem.status)" />
                              <span class="mx-1 font-weight-800">{{ bookItem.status }}</span>
                            </h5>
                          </v-chip>
                          <v-icon icon="mdi-cash-fast" class="animate-charcter" />
                          {{ formatCurrency(bookItem.totalPrice) }}
                        </h3>
                      </div>
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
                            prepend-icon="mdi-cash-sync"
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
                            prepend-icon="mdi-star-plus-outline"
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
        <n-panel-not-found
          v-if="!historyBookingHotels.results && !loadingHotels"
          icon="mdi-timer-sand-empty"
          title="Bạn chưa booking hotel nào!"
        />
        <v-container>
          <n-panel-loading :loading="loadingHotels" />
          <v-row v-if="!loadingHotels" class="my-5">
            <n-panel-loading :loading="loadingHotels" />
            <v-col
              v-for="bookItem in historyBookingHotels.results"
              :key="bookItem.id"
              cols="12"
            >
              <v-card
                elevation="0"
                class="my-2 card-booking"
              >
                <v-row>
                  <v-col cols="4">
                    <n-image :src="bookItem.hotel.coverPicture" class="custom-image" />
                  </v-col>
                  <v-col>
                    <v-card-text @click="() => getHotelBookingDetail(bookItem.id)">
                      <h2>{{ bookItem.hotel.name }}</h2>
                      <div class="my-2">
                        <v-row>
                          <v-col cols="3">
                            <v-icon icon="mdi-clipboard-text-clock" />
                            Checkin/Checkout
                          </v-col>
                          <v-col>
                            <h4>
                              {{ formatDate(bookItem.startDate) }}
                              <v-icon icon="mdi-chevron-right" />
                              {{ formatDate(bookItem.endDate) }}
                            </h4>
                          </v-col>
                        </v-row>
                        <v-row class="mt-1">
                          <v-col cols="3">
                            <v-icon icon="mdi-information-slab-box-outline" />
                            Rooms booking
                          </v-col>
                          <v-col>
                            <h4 v-for="room in bookItem.bookingItems" :key="room.id">
                              <v-icon icon="mdi-bed-single-outline" class="mr-1 mt-n1" />
                              {{ room.roomName }} x {{ room.quantity }}
                            </h4>
                          </v-col>
                        </v-row>
                        <v-row class="mt-1">
                          <v-col cols="3">
                            <v-icon icon="mdi-map-marker-radius-outline" />
                            Địa chỉ
                          </v-col>
                          <v-col>
                            <h4>
                              {{ bookItem.hotel.address }}
                            </h4>
                          </v-col>
                        </v-row>
                        <p class="mt-2" v-if="bookItem.note">
                          <v-icon icon="mdi-note-text-outline" />
                          Ghi chú:
                          <span class="mx-3 font-weight-600">{{ bookItem.note }}</span>
                        </p>
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-row>
                        <v-col cols="9">
                          <h3 class="animate-charcter">
                            <v-chip class="mr-5" :color="checkColorTag(bookItem.status)">
                              <h5>
                                <v-icon :icon="getIconStatus(bookItem.status)" />
                                <span class="mx-1 font-weight-800">{{ bookItem.status }}</span>
                              </h5>
                            </v-chip>
                            <v-icon icon="mdi-cash-fast" class="animate-charcter" />
                            {{ formatCurrency(bookItem.totalPrice) }}
                          </h3>
                        </v-col>
                        <v-col>
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
                                prepend-icon="mdi-cash-sync"
                                @click="bookItem.dialogPayment = true"
                              >
                                Thanh toán
                              </v-btn>
                            </template>
                          </n-dialog-pay-again>
                          <n-dialog-review
                            v-model="bookItem.dialogReview"
                            :idBooking="bookItem.id"
                            title="Hotel"
                          >
                            <template #action>
                              <v-btn
                                v-if="bookItem.status === 'Completed'"
                                class="text-none"
                                color="primary"
                                rounded
                                min-width="110"
                                variant="outlined"
                                prepend-icon="mdi-star-plus-outline"
                                @click="bookItem.dialogReview = true"
                              >
                                Đánh giá
                              </v-btn>
                            </template>
                          </n-dialog-review>
                        </v-col>
                      </v-row>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-card>
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
    <n-dialog-booking-tour-detail />
    <n-dialog-booking-hotel-detail />
  </v-sheet>
</template>
<script lang="ts" setup>
import NImage from '@/components/NImage.vue'
import NPagination from '@/components/NPagination.vue'
import NDialog from '@/components/NDialog.vue'
import NPanelLoading from '@/components/NPanelLoading.vue'
import NDialogPayAgain from '@/components/NDialogPayAgain.vue'
import NDialogBookingTourDetail from '@/components/NDialogBookingTourDetail.vue'
import NDialogBookingHotelDetail from '@/components/NDialogBookingHotelDetail.vue'
import NDialogReview from '@/components/NDialogReview.vue'
import NPanelNotFound from '@/components/NPanelNotFound.vue'
import { ref, onMounted } from 'vue'
import _ from 'lodash'
import { useRoute } from 'vue-router'
import { useBooking } from '@/composables/useBooking'
import { convertionType } from '@/helpers/convertion'
import { handleRoute } from '@/helpers/loadingRoute'

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
  callBackPayment,
  getTourBookingDetail,
  getHotelBookingDetail
} = useBooking()
const { formatCurrency, getIconStatus, formatDate, checkColorTag } = convertionType()
const route = useRoute()
const tabWindow = ref<number>(1)
onMounted(async() => {
  if (!_.isEmpty(route.query)){
    await callBackPayment(route.query)
  }
  getHistoryBookingTours()
  getHistoryBookingHotels()
})
</script>
<style lang="scss" scoped>
.booking-page {
  background-image: url('@/assets/img/map-bg.png');
  background-size: contain;
  background-position: center center;
}
.custom-image {
  -webkit-mask-image: url("@/assets/img/card-bg.png");
  mask-image: url("@/assets/img/card-bg.png");
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}
.card-booking {
  transition: all 0.6s cubic-bezier(0.680, -0.550, 0.265, 1.550);
}
.card-booking:hover {
  transform: translateY(-1.2rem) scale(1.03);
}
</style>