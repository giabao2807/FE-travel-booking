<template>
  <v-sheet class="pa-0 ma-0 tour-container">
    <v-row class="py-5" justify="center">
      <v-col cols="8" class="mx-5">
        <h1>
          {{ tourInfo?.name }}
        </h1>
        <div class="mt-5">
          <v-icon :icon="voteText(tourInfo?.rate).icon" color="primary" class="mr-1" />
          <strong class="text-color-priamry">{{ voteText(tourInfo?.rate).name }}</strong>
          |
          <strong>{{ tourInfo?.numReview }} đánh giá.</strong>
        </div>
        <v-sheet color="transparent">
          <n-carousel class="mt-5" :data="tourInfo?.listImages" />
          <v-card color="transparent" class="pa-5">
            <v-row>
              <v-col>
                <v-icon icon="mdi-clock-start" />
                Khởi hành:
                <strong class="mx-2">{{ tourInfo?.departure }}</strong>
              </v-col>
              <v-col>
                <v-icon icon="mdi-map-marker-multiple-outline" />
                Địa điểm:
                <strong class="mx-2">{{ tourInfo?.city }}</strong>
              </v-col>
              <v-col>
                <v-icon icon="mdi-map-clock-outline" />
                Thời gian:
                <strong class="mx-2">{{ tourInfo?.totalDays }}</strong>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-icon icon="mdi-shoe-sneaker" />
                Phương tiện:
                <v-icon
                  v-for="item in getTraffic(tourInfo?.traffics)"
                  :key="item.value"
                  :icon="item?.icon"
                  class="mx-2"
                />
              </v-col>
              <v-col>
                <v-icon icon="mdi-translate-variant" />
                Ngôn ngữ:
                <strong class="mx-2">{{ tourInfo?.languageTour }}</strong>
              </v-col>
              <v-col>
                <v-row
                  align="center"
                  class="ma-0"
                >
                  <v-icon icon="mdi-vote-outline" />
                  Rating:
                  <v-rating
                    :model-value="tourInfo?.rate"
                    class="mx-2"
                    color="amber"
                    density="compact"
                    half-increments
                    readonly
                    size="small"
                  />
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-sheet>
        <v-container>
          <v-card color="transparent" class="mx-0 rounded-xl" elevation="2">
            <v-card-text>
              <h2 class="mt-2 mb-5 text-color-priamry text-center">Những Trải Nghiệm Thú Vị</h2>
              <div v-html="tourInfo?.descriptions" />
            </v-card-text>
          </v-card>
          <v-card color="transparent" class="my-5 rounded-xl" elevation="2">
            <v-card-text>
              <h1 class="mt-2 mb-5 text-color-priamry text-center">Chương Trình Tour</h1>
              <div v-html="tourInfo?.scheduleContent" />
            </v-card-text>
          </v-card>
          <v-card color="transparent" class="my-5 rounded-xl" elevation="2">
            <v-card-text>
              <h2 class="mt-2 mb-5 text-color-priamry text-center">Những Lưu Ý Khi Tham Gia</h2>
              <div v-html="tourInfo?.note" />
            </v-card-text>
          </v-card>
        </v-container>
        <v-sheet color="transparent" class="pa-2">
          <div class="text-center">
            <h2>Những Tours Tương Tự</h2>
          </div>
          <v-slide-group
            class="pa-4"
            selected-class="bg-success"
            show-arrows
          >
            <v-slide-group-item
              v-for="item in anotherTours"
              :key="item.id"
            >
              <v-card
                class="ma-5"
                width="300"
                @click="()=> hanldeRoute({ name: 'hotelDetail', params: { id: item?.id } })"
              >
                <v-card-title class="font-weight-bold">
                  <n-image
                    :src="item?.coverPicture"
                  />
                  {{ item?.name }}
                  <v-tooltip
                    activator="parent"
                    :text="item?.name"
                    location="top"
                  />
                </v-card-title>
                <v-card-text class="pt-2">
                  <v-row
                    align="center"
                    class="mx-0"
                  >
                    <v-rating
                      :model-value="item.rate"
                      color="amber"
                      density="compact"
                      half-increments
                      readonly
                      size="small"
                    />
                    <div class="text-grey ms-4">
                      {{ item?.rate }} ({{ item?.numReview }})
                    </div>
                  </v-row>
                  <div v-if="item?.couponData" class="mt-5 mb-2 remove-text text-grey-darken-2">
                    {{ formatCurrency(item?.price) }}
                  </div>
                  <div class="d-flex align-center justify-space-between mb-3">
                    <div class="text-subtitle-1 animate-charcter">
                      <v-icon icon="mdi-cash-multiple" class="mt-n2 animate-charcter" />
                      {{
                        formatCurrency(
                          getPriceDiscount(item?.price, item?.couponData.discountPercent)
                        )
                      }}
                    </div>
                    <div>
                      <v-icon
                        v-for="traffic in getTraffic(item?.traffics)"
                        :key="traffic.value"
                        :icon="traffic?.icon"
                        color="primary"
                      />
                    </div>
                  </div>
                  <v-divider class="mx-n2 mb-1" />
                  <div class="d-flex align-center justify-space-between my-3">
                    <div>
                      <v-icon icon="mdi-calendar-text-outline" color="primary" />
                      Thời gian:
                    </div>
                    <v-chip label color="primary">{{ item?.totalDays }}</v-chip>
                  </div>
                  <div>
                    <v-icon icon="mdi-calendar-start-outline" color="primary" />
                    Khởi hành: {{ item?.departure }}
                  </div>
                </v-card-text>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </v-col>
      <v-col class="mt-n2 pa-0">
        <v-card
          elevation="5"
          class="mx-auto my-12 card-drawer"
          width="374"
        >
          <template #loader="{ isActive }">
            <v-progress-linear
              :active="isActive"
              color="deep-purple"
              height="4"
              indeterminate
            />
          </template>

          <v-card-item>
            <v-card-title class="font-weight-bold pa-3">
              <h2>Booking Tour</h2>
            </v-card-title>

            <v-card-subtitle>
              <span class="me-1">Local Favorite</span>

              <v-icon
                color="error"
                icon="mdi-fire-circle"
                size="small"
              />
            </v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <v-text-field
              v-model="bookingTour.startDate"
              :min="minDate(new Date())"
              label="Ngày khởi hành"
              name="startDate"
              type="Date"
              color="primary"
              variant="outlined"
              hide-details="auto"
            />
            <v-card class="my-5 pa-5">
              <v-row align="center">
                <v-col cols="8">
                  <p class="text-disabled text-body-1">Số lượng</p>
                </v-col>
                <v-col>
                  <v-row>
                    <v-icon icon="mdi-minus-thick" class="mr-5" @click="() => hanldeAmount()" />
                    <h2>{{ bookingTour?.bookingItems[0].quantity }}</h2>
                    <v-icon icon="mdi-plus-thick" class="ml-5" @click="() => hanldeAmount(true)" />
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
            <v-divider class="ma-5" />
            <v-row v-if="tourInfo?.couponData" class="ml-3">
              <v-col cols="6">
                <h5>
                  <v-icon icon="mdi-ticket-percent-outline" />
                  Giảm giá:
                </h5>
              </v-col>
              <v-col>
                <h2 class="animate-charcter">
                  {{ tourInfo?.couponData.discountPercent }}%
                </h2>
              </v-col>
            </v-row>
            <v-row v-if="tourInfo?.couponData" class="ml-3">
              <v-col cols="6"><h4>Giá Tour:</h4></v-col>
              <v-col>
                <h3 class="remove-text">
                  <p>{{ formatCurrency(tourInfo?.price) }}</p>
                </h3>
              </v-col>
            </v-row>
            <v-row class="ml-3">
              <v-col cols="6"><h4>Tổng tiền:</h4></v-col>
              <v-col>
                <h2 class="animate-charcter">
                  {{
                    formatCurrency(
                      getPriceDiscount(tourInfo?.price, tourInfo?.couponData.discountPercent)
                        * bookingTour?.bookingItems[0].quantity
                    )
                  }}
                </h2>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="ma-5">
            <v-spacer />
            <v-btn
              :disabled="!bookingTour.startDate"
              prepend-icon="mdi-checkbox-marked-circle-auto-outline"
              color="primary"
              variant="tonal"
              @click="() => dialogBooking = true"
            >
              Book now
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog persistent width="70%" v-model="dialogBooking">
      <v-card>
        <v-card-title class="justify-space-between">
          <h2 class="text-center ma-2">BOOK TOUR</h2>
          <v-timeline direction="horizontal" truncate-line="both">
            <v-timeline-item
              v-for="n in 3"
              :key="n"
              :icon="['mdi-cube-scan', 'mdi-credit-card-outline', 'mdi-cloud-check-variant'][n-1]"
              :icon-color="step === n ? 'primary' : '#000'"
              dot-color="transparent"
            />
          </v-timeline>
        </v-card-title>

        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text class="ml-2">
              <h2 class="mb-5">Confirm Tour Information</h2>
              <v-row>
                <v-col cols="4">
                  <n-image :src="tourInfo?.listImages[0]" height="250" />
                  <div class="my-2">
                    <v-icon icon="mdi-clock-start" />
                    Khởi hành:
                    <strong class="mx-2">{{ tourInfo?.departure }}</strong>
                  </div>
                  <div class="my-2">
                    <v-icon icon="mdi-shoe-sneaker" />
                    Phương tiện di chuyển:
                    <v-icon
                      v-for="item in getTraffic(tourInfo?.traffics)"
                      :key="item.value"
                      :icon="item?.icon"
                      class="mx-2"
                    />
                  </div>
                  <div class="my-2">
                    <v-icon icon="mdi-weather-cloudy-clock" />
                    Thời gian:
                    <strong class="mx-2">{{ tourInfo?.totalDays }}</strong>
                  </div>
                </v-col>
                <v-col>
                  <div>
                    <h2>{{ tourInfo?.name }}</h2>
                  </div>
                  <div class="mt-5 mb-2">
                    <v-icon icon="mdi-map-clock-outline" />
                    Ngày Khởi hành:
                    <strong class="mx-2">{{ bookingTour?.startDate }}</strong>
                  </div>
                  <div class="my-2">
                    <v-icon icon="mdi-ticket-account" />
                    Số lượng:
                    <strong class="mx-2">{{ bookingTour?.bookingItems[0].quantity }}</strong>
                    <v-icon icon="mdi-account-multiple" />
                  </div>
                  <div class="w-75">
                    <v-icon icon="mdi-note-edit-outline" />
                    Ghi chú (nếu có)
                    <v-textarea
                      variant="outlined"
                      auto-grow
                      rows="2"
                      row-height="20"
                      color="primary"
                      hide-details="auto"
                      class="text-field"
                    />
                  </div>
                  <div class="w-75">
                    <v-icon icon="mdi-bank-outline" />
                    Chọn ngân hàng thanh toán
                    <v-select
                      v-model="bookingTour.bankCode"
                      :items="BANK"
                      item-title="name"
                      item-value="value"
                      color="primary"
                      hide-details="auto"
                      class="text-field"
                      variant="outlined"
                      clearable
                    />
                  </div>
                </v-col>
              </v-row>
              <v-row justify="end">
                <div class="text-h6 ma-2 animate-charcter">
                  Tổng tiền:
                  <strong class="mx-2">
                    {{
                      formatCurrency(
                        getPriceDiscount(tourInfo?.price, tourInfo?.couponData.discountPercent)
                          * bookingTour?.bookingItems[0].quantity
                      )
                    }}
                  </strong>
                </div>
              </v-row>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text />
          </v-window-item>

          <v-window-item :value="3">
            <div class="pa-4 text-center">
              <v-img
                class="mb-4"
                contain
                height="128"
                src="https://cdn.vuetifyjs.com/images/logos/v.svg"
              />
              <h3 class="text-h6 font-weight-light mb-2">
                Welcome to Vuetify
              </h3>
              <span class="text-caption text-grey">Thanks for signing up!</span>
            </div>
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
            :disabled="!bookingTour?.bankCode"
            v-if="step < 3"
            color="primary"
            variant="flat"
            @click="() => {
              handldeBookingTours(bookingTour)
              step++
            }"
          >
            Next
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>
<script lang="ts" setup>
import { useTourDetail } from '@/composables/useTourDetail'
import { convertionType } from '@/helpers/convertion'
import { hanldeRoute } from '@/helpers/loadingRoute'
import NCarousel from '@/components/NCarousel.vue'
import NImage from '@/components/NImage.vue'
import { BANK } from '@/resources/mockData'
import { ref } from 'vue'

const {
  tourInfo,
  bookingTour,
  anotherTours,
  dialogBooking,
  handldeBookingTours,
  getTraffic,
  hanldeAmount
} = useTourDetail()
const { formatCurrency, voteText, getPriceDiscount, minDate } = convertionType()
const step = ref<number>(1)
</script>

<style lang="scss" scoped>
.tour-container {
  background-image: url('@/assets/img/map-bg.png');
  background-size:cover;
  width: 100%;

  .container-detail {
    position: relative;
    z-index: 1;
    background-image: url('@/assets/img/bg-detail.png');
    background-size: cover;
    height: 100%;
  }
  .toolbar {
    width: 60%;
    min-height: 12%;
    justify-content: center;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
  .carousel {
    border-bottom: 1px solid var(--loading-bgcolor);
  }
  .text-field {
    width: 30% !important;
  }
  .text-field:hover{
    border-radius: 8px;
    box-shadow: var(--txt-shadow-color) -8px 2px 0px 0px;
    border-collapse: collapse;
    opacity: 1;
  }
  .el-range-editor .is-active:hover {
      box-shadow: 0 0 0 1px #d32f2f inset;
  }
  @media screen and (min-width: 1300px) {
    .card-drawer {
      position: fixed !important;
      width: 380px
    }
  }


}
::v-deep {
  .single-box-excerpt, .content-tour-item {
    span {
      line-height: 1.8;
    }
    li {
      margin-left: 2rem !important;
    }
    u {
      text-decoration: none !important;
    }
  }
  .content-tour-tab-tour-rule-2 {
    p {
      text-align: start !important;
    }
  }

}
</style>