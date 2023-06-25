<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <v-dialog
    v-model="dialogBookingTourDetail"
    transition="dialog-top-transition"
    style="color: transparent;"
    width="65%"
  >
    <v-card
      color="transparent"
      elevation="0"
      style="position : relative; min-height: 450px;"
    >
      <v-card-item>
        <n-image
          :src="tourBookingDetail?.tour.coverPicture"
          class="composition-photo"
          style="position: absolute; bottom: 30%; width: 45%; height: 350px; margin: 12px; box-shadow: 8px 8px 25px 0px rgba(0,0,0,0.30)"
        />
        <div style="background-color: #fff; color: #000; height: 350px; margin-top: 20px; box-shadow: 8px 8px 25px 0px rgba(0,0,0,0.30)">
          <div class="my-8" style="margin-left: 50%; padding: 8px;">
            <h3>{{ tourBookingDetail?.tour.name }}</h3>
            <div style="font-size: 13px; margin-left: 20px;">
              <p class="mt-2">
                <v-icon icon="mdi-timeline-clock-outline" />
                Ngày Đặt:
                <span class="mx-3 font-weight-600">{{ formatDate(tourBookingDetail?.createdAt) }}</span>
              </p>
              <p class="mt-2">
                <v-icon icon="mdi-account-multiple-outline" />
                Số Lượng:
                <span class="mx-3 font-weight-600">{{ tourBookingDetail?.bookingItems[0].quantity }}</span>
              </p>
              <p class="mt-2">
                <v-icon icon="mdi-clock-start" />
                Khởi Hành:
                <span class="mx-3 font-weight-600">{{ tourBookingDetail?.tour.departure }}</span>
              </p>
              <div class="d-flex mt-2">
                <v-icon icon="mdi-clipboard-text-clock" />
                Ngày Khởi Hành / Kết Thúc:
                <h4 class="mx-2">
                  {{ formatDate(tourBookingDetail?.startDate) }}
                  <v-icon icon="mdi-chevron-right" />
                  {{ formatDate(tourBookingDetail?.endDate) }}
                </h4>
              </div>
              <p class="mt-2" v-if="tourBookingDetail?.note">
                <v-icon icon="mdi-note-text-outline" />
                Ghi Chú:
                <span class="mx-3 font-weight-600">{{ tourBookingDetail?.note }}</span>
              </p>
              <p class="mt-2">
                <v-icon icon="mdi-cash-fast" />
                Giá Gốc:
                <span class="mx-3 font-weight-600">{{ formatCurrency(tourBookingDetail?.tour.price) }}</span>
              </p>
              <div class="mt-2 d-flex align-center">
                <p class="animate-charcter">
                  <v-icon icon="mdi-cash-fast" class="animate-charcter" />
                  Tổng Tiền:
                </p>
                <h2 class="animate-charcter mx-3">
                  {{ formatCurrency(tourBookingDetail.totalPrice) }}
                </h2>
              </div>
              <p class="mt-2">
                <v-icon :icon="getIconStatus(tourBookingDetail.status)" :color="checkColorTag(tourBookingDetail.status)" />
                <v-chip class="mx-n3" variant="text" :color="checkColorTag(tourBookingDetail.status)">
                  <span>Trạng Thái:</span>
                </v-chip>
                <v-chip label class="mx-3" :color="checkColorTag(tourBookingDetail.status)">
                  <span class="mx-3 font-weight-600">{{ tourBookingDetail.status }}</span>
                </v-chip>
              </p>
            </div>
            <v-btn
              variant="text"
              prepend-icon="mdi-close-outline"
              class="text-none"
              color="error"
              style="position: absolute; bottom: 17%; right: 5%;"
              @click="() => {
                dialogBookingTourDetail = false
              }"
            >
              Close
            </v-btn>
          </div>
        </div>
      </v-card-item>
    </v-card>
  </v-dialog>
</template>
<script lang="ts" setup>
import { convertionType } from '@/helpers/convertion'
import NImage from './NImage.vue'
import { useBooking } from '@/composables/useBooking'

const { dialogBookingTourDetail, tourBookingDetail } = useBooking()
const { formatCurrency, getIconStatus, formatDate, checkColorTag } = convertionType()
</script>
<style lang="scss" scoped>
.container-photo {
  overflow: hidden;
}
.composition-photo {
  transition: all 0.6s cubic-bezier(0.680, -0.550, 0.265, 1.550);
}
.composition-photo:hover {
  transform: scale(1.05) rotate(-2deg);
}
</style>