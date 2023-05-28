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
                @click="()=> hanldeRoute({ name: 'tourDetail', params: { id: item?.id } })"
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
              v-model="bookTour.startDate"
              :min="minDate(new Date())"
              @update:model-value="(event) => getQuantityByStartDate(event)"
              label="Ngày khởi hành"
              name="startDate"
              type="Date"
              color="primary"
              variant="outlined"
              hide-details="auto"
            />
            <n-select-quantity label="Số lượng" v-model="bookTour.bookingItems[0].quantity" :quantity="quantityByStartDate" />
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
                        * bookTour?.bookingItems[0].quantity
                    )
                  }}
                </h2>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="ma-5">
            <v-spacer />
            <n-dialog-book
              v-model="dialogBooking"
              titleDialog="BOOK TOUR"
              :tourInfo="tourInfo"
            >
              <template #action>
                <v-btn
                  prepend-icon="mdi-checkbox-marked-circle-auto-outline"
                  class="mr-2"
                  color="primary"
                  variant="tonal"
                  @click="dialogBooking = true"
                >
                  Book now
                </v-btn>
              </template>
            </n-dialog-book>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script lang="ts" setup>
import NSelectQuantity from '@/components/NSelectQuantity.vue'
import NCarousel from '@/components/NCarousel.vue'
import NDialogBook from '@/components/NDialogBook.vue'
import NImage from '@/components/NImage.vue'
import { onMounted, watch } from 'vue'
import { useTourDetail } from '@/composables/useTourDetail'
import { convertionType } from '@/helpers/convertion'
import { hanldeRoute } from '@/helpers/loadingRoute'
import { useLoading } from '@/composables/useLoading'

const {
  tourInfo,
  bookTour,
  anotherTours,
  tourId,
  dialogBooking,
  quantityByStartDate,
  getQuantityByStartDate,
  getTourById
} = useTourDetail()
const { formatCurrency, voteText, getPriceDiscount, minDate, getTraffic } = convertionType()
const { startLoading, finishLoading } = useLoading()
onMounted(async() => {
  startLoading()
  await getTourById(tourId.value)
  finishLoading()
})
watch(tourId, async(newId) => {
  if (newId){
    startLoading()
    await getTourById(newId)
    finishLoading()
  }
})
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