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
          <v-card v-if="tourInfo?.note" color="transparent" class="my-5 rounded-xl" elevation="2">
            <v-card-text>
              <h2 class="mt-2 mb-5 text-color-priamry text-center">Những Lưu Ý Khi Tham Gia</h2>
              <div v-html="tourInfo?.note" />
            </v-card-text>
          </v-card>
        </v-container>
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
                    <h2>{{ bookingTour.amount }}</h2>
                    <v-icon icon="mdi-plus-thick" class="ml-5" @click="() => hanldeAmount(true)" />
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
            <v-divider class="ma-5" />
            <v-row class="ml-3">
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
            <v-row class="ml-3">
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
                      getPriceDiscount(tourInfo?.price, tourInfo?.couponData.discountPercent) * bookingTour.amount
                    )
                  }}
                </h2>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="ma-5">
            <v-btn prepend-icon="mdi-cart-outline" variant="outlined">
              Add To Cart
            </v-btn>
            <v-spacer />
            <v-btn prepend-icon="mdi-order-bool-descending-variant" variant="outlined">
              Book Now
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script lang="ts" setup>
import { useTourDetail } from '@/composables/useTourDetail'
import { convertionType } from '@/helpers/convertion'
import NCarousel from '@/components/NCarousel.vue'

const { tourInfo, bookingTour, getTraffic, hanldeAmount } = useTourDetail()
const { formatCurrency, voteText, getPriceDiscount } = convertionType()
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