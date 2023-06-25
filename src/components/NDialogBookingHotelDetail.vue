<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <v-dialog
    v-model="dialogBookingHotelDetail"
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
        <div class="container-photo">
          <n-image
            :src="hotelBookingDetail?.hotel.coverPicture"
            class="composition-photo"
            style="position: absolute; bottom: 30%; width: 45%; height: 350px; margin: 12px; box-shadow: 8px 8px 25px 0px rgba(0,0,0,0.30)"
          />
        </div>
        <div style="background-color: #fff; color: #000; height: 350px; margin-top: 20px; box-shadow: 8px 8px 25px 0px rgba(0,0,0,0.30)">
          <div class="my-8" style="margin-left: 50%; padding: 8px;">
            <h3>{{ hotelBookingDetail?.hotel.name }}</h3>
            <div style="font-size: 13px; margin-left: 20px;">
              <div class="my-2">
                <v-row>
                  <v-col cols="5">
                    <v-icon icon="mdi-clipboard-text-clock" />
                    Checkin/Checkout:
                  </v-col>
                  <v-col>
                    <h4>
                      {{ formatDate(hotelBookingDetail?.startDate) }}
                      <v-icon icon="mdi-chevron-right" />
                      {{ formatDate(hotelBookingDetail?.endDate) }}
                    </h4>
                  </v-col>
                </v-row>
                <v-row class="mt-1">
                  <v-col cols="5">
                    <v-icon icon="mdi-information-slab-box-outline" />
                    Rooms booking:
                  </v-col>
                  <v-col>
                    <h4 v-for="room in hotelBookingDetail?.bookingItems" :key="room.id">
                      <v-icon icon="mdi-bed-single-outline" class="mr-1 mt-n1" />
                      {{ room.roomName }} x {{ room.quantity }}
                    </h4>
                  </v-col>
                </v-row>
                <p class="mt-2">
                  <v-icon icon="mdi-map-marker-radius-outline" />
                  Địa chỉ:
                  <span class="mx-3 font-weight-600"> {{ hotelBookingDetail?.hotel.address }}</span>
                </p>
                <p class="mt-2" v-if="hotelBookingDetail?.note">
                  <v-icon icon="mdi-note-text-outline" />
                  Ghi chú:
                  <span class="mx-3 font-weight-600">{{ hotelBookingDetail?.note }}</span>
                </p>
              </div>
              <div class="mt-2 d-flex align-center">
                <p class="animate-charcter">
                  <v-icon icon="mdi-cash-fast" class="animate-charcter" />
                  Tổng Tiền:
                </p>
                <h2 class="animate-charcter mx-3">
                  {{ formatCurrency(hotelBookingDetail.totalPrice) }}
                </h2>
              </div>
              <p class="mt-2">
                <v-icon :icon="getIconStatus(hotelBookingDetail.status)" :color="checkColorTag(hotelBookingDetail.status)" />
                <v-chip class="mx-n3" variant="text" :color="checkColorTag(hotelBookingDetail.status)">
                  <span>Trạng Thái:</span>
                </v-chip>
                <v-chip label class="mx-3" :color="checkColorTag(hotelBookingDetail.status)">
                  <span class="mx-3 font-weight-600">{{ hotelBookingDetail.status }}</span>
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
                dialogBookingHotelDetail = false
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

const { dialogBookingHotelDetail, hotelBookingDetail } = useBooking()
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