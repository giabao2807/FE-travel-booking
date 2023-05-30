<template>
  <v-sheet>
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
    <v-window v-model="tabWindow">
      <v-window-item :value="1">
        <v-container>
          <v-row class="my-5">
            <v-col
              v-for="bookItem in historyBookingTours.results"
              :key="bookItem.id"
              cols="12"
            >
              <v-card elevation="0">
                <v-card-text>
                  <v-row>
                    <v-col cols="4">
                      <n-image :src="bookItem.tour.coverPicture" />
                    </v-col>
                    <v-col>
                      <h2>{{ bookItem.tour.name }}</h2>
                      <div class="my-5">
                        <p>Số lượng {{ bookItem.bookingItems.quantity }}</p>
                        <p>Ngày khởi hành: {{ formatDate(bookItem.startDate) }}</p>
                        <p>Ngày kết thúc: {{ formatDate(bookItem.endDate) }}</p>
                        <p v-if="bookItem.note">Ghi chú: {{ bookItem.note }}</p>
                      </div>
                      <v-card-actions>
                        <p>Tổng tiền: {{ bookItem.totalPrice }}</p>
                        <v-spacer />
                        <p>Trạng thái: {{ bookItem.status }}</p>
                        <n-dialog-pay-again
                          v-model="bookItem.dialog"
                          :idBooking="bookItem.id"
                        >
                          <template #action>
                            <v-btn
                              v-if="bookItem.status === 'Unpaid'"
                              class="text-none"
                              @click="bookItem.dialog = true"
                            >
                              Tiếp tục thanh toán
                            </v-btn>
                          </template>
                        </n-dialog-pay-again>
                      </v-card-actions>
                    </v-col>
                  </v-row>
                </v-card-text>
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
          <v-row>
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
import NDialogPayAgain from '@/components/NDialogPayAgain.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBookingDialog } from '@/composables/useBookingDialog'
import { useBooking } from '@/composables/useBooking'
import { convertionType } from '@/helpers/convertion'

const { messageStatusPayment, callBackPayment } = useBookingDialog()
const {
  pageTour,
  pageHotel,
  historyBookingTours,
  historyBookingHotels,
  getHistoryBookingTours,
  getHistoryBookingHotels
} = useBooking()
const { formatDate } = convertionType()
const route = useRoute()
const tabWindow = ref<number>(1)
onMounted(() => {
  getHistoryBookingTours()
  getHistoryBookingHotels()

  if (Object.keys(route.query).length !== 0){
    callBackPayment(route.query)
  }
})
</script>