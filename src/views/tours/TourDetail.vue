<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <v-sheet class="tour-container">
    <v-row class="py-5" justify="center">
      <v-col cols="8" class="mx-5">
        <h1>
          {{ tourInfo?.name }}
        </h1>
        <div class="mt-5 d-flex">
          <v-icon :icon="voteText(tourInfo?.rate).icon" color="primary" class="mr-1" />
          <strong class="text-color-priamry">{{ voteText(tourInfo?.rate).name }}</strong>
          <strong class="mx-2">|</strong>
          <strong>{{ tourInfo?.numReview }} đánh giá.</strong>
          <v-spacer />
          <div v-if="isSignIn">
            <v-btn
              v-if="!tourInfo?.isFavorite"
              color="primary"
              prepend-icon="mdi-cards-heart-outline"
              class="text-none rounded-xl"
              variant="plain"
              @click="async () => {
                await addFavoriteTour(tourInfo?.id || '')
                getTourById(tourInfo?.id || '')
              }"
            >
              Yêu Thích
              <v-tooltip
                activator="parent"
                text="Thêm vào trang yêu thích"
                location="top"
              />
            </v-btn>
            <v-btn
              v-else
              color="error"
              prepend-icon="mdi-heart"
              class="text-none rounded-xl"
              variant="plain"
              @click="async () => {
                await removeFavoriteTour(tourInfo?.id || '')
                getTourById(tourInfo?.id || '')
              }"
            >
              Bỏ Yêu Thích
              <v-tooltip
                activator="parent"
                text="Bỏ khỏi trang yêu thích"
                location="top"
              />
            </v-btn>
          </div>
        </div>
        <v-sheet color="transparent">
          <n-carousel class="mt-2" :data="tourInfo?.listImages" />
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
                  :key="item?.value"
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
        <n-panel-review
          :id="tourInfo?.id"
          titlePanel="Tour"
          :firstPageReview="firstPageReview"
          :loadingReview="loadingReview"
          :dataReview="dataReview"
          @getReview="getReviews"
          @getReviewByPage="getReviews"
        />
        <v-sheet v-if="anotherTours.length !== 0" color="transparent" class="pa-2">
          <div class="text-center">
            <h2>Những Tours Tương Tự</h2>
          </div>
          <n-panel-loading :loading="loadingAnotherTours" />
          <v-slide-group
            v-if="!loadingAnotherTours"
            class="pa-4"
            selected-class="bg-success"
            show-arrows
          >
            <v-slide-group-item
              v-for="item in anotherTours"
              :key="item?.id"
            >
              <v-card
                class="ma-5"
                width="300"
                @click="()=> handleRoute({ name: 'tourDetail', params: { id: item?.id } })"
              >
                <v-card-title class="font-weight-bold pa-2" style="font-size: 18px;">
                  <n-image
                    :src="item?.coverPicture"
                    height="150"
                  />
                  {{ item?.name }}
                  <v-tooltip
                    activator="parent"
                    :text="item?.name"
                    location="top"
                  />
                </v-card-title>
                <v-card-text class="mt-2">
                  <v-row
                    align="center"
                    class="mx-0"
                  >
                    <v-rating
                      :model-value="item?.rate"
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
                  <div v-if="!_.isEmpty(item?.couponData)" class="my-3 remove-text text-grey-darken-2">
                    {{ formatCurrency(item?.price) }}
                  </div>
                  <div class="d-flex align-center justify-space-between my-3">
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
        <div class="mx-auto my-12 card-design">
          <v-card
            class="card-drawer"
          >
            <div class="my-5 mx-3">
              <v-card-item>
                <v-card-title class="py-3">
                  <h2 class="">
                    <v-icon icon="mdi-airballoon-outline" size="small" />
                    Booking Tour
                  </h2>
                </v-card-title>
                <v-card-subtitle>
                  <span class="ml-10">Local Favorite</span>
                  <v-icon
                    color="error"
                    icon="mdi-fire-circle"
                    size="small"
                  />
                </v-card-subtitle>
              </v-card-item>
              <v-card-text class="mx-4">
                <v-form ref="bookingRef">
                  <v-text-field
                    v-model="bookTour.startDate"
                    :min="minDate(new Date())"
                    @update:model-value="(event) => getQuantityByStartDate(event)"
                    :rules="[ruleRequired('Ngày khởi hành')]"
                    label="Ngày khởi hành"
                    name="startDate"
                    type="Date"
                    prepend-inner-icon="mdi-clock-start"
                    density="compact"
                    color="primary"
                    hide-details="auto"
                    variant="outlined"
                    class="my-5 text-field"
                  />
                  <div v-if="quantityTour">
                    <v-divider class="mx-5 mb-3" />
                    <span>
                      <v-icon icon="mdi-ticket-outline" />
                      Số lượng vé còn lại: {{ quantityTour }}
                    </span>
                  </div>
                  <v-text-field
                    v-model="bookTour.bookingItems[0].quantity"
                    label="Số lượng"
                    density="compact"
                    :min="0"
                    :max="quantityTour"
                    type="number"
                    :rules="[...ruleQuantity, ruleMaxQuantity(quantityTour)]"
                    color="primary"
                    prepend-inner-icon="mdi-account-multiple-outline"
                    hide-details="auto"
                    variant="outlined"
                    class="text-field"
                  />
                </v-form>
                <v-divider class="my-5" />
                <v-row v-if="!_.isEmpty(tourInfo?.couponData)" class="ml-3">
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
                <v-row v-if="!_.isEmpty(tourInfo?.couponData)" class="ml-3">
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
                            * (bookTour?.bookingItems[0].quantity || 1)
                        )
                      }}
                    </h2>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="my-5">
                <v-spacer />
                <n-dialog-book
                  v-model="dialogBooking"
                  titleDialog="BOOK TOUR"
                  :tourInfo="tourInfo"
                >
                  <template #action>
                    <v-btn
                      min-width="120"
                      prepend-icon="mdi-checkbox-marked-circle-auto-outline"
                      class="text-none rounded-xl"
                      color="primary"
                      variant="tonal"
                      @click="() => openDialogBooking()"
                    >
                      Đặt Tour
                    </v-btn>
                  </template>
                </n-dialog-book>
              </v-card-actions>
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script lang="ts" setup>
import NCarousel from '@/components/NCarousel.vue'
import NDialogBook from '@/components/NDialogBook.vue'
import NImage from '@/components/NImage.vue'
import NPanelLoading from '@/components/NPanelLoading.vue'
import NPanelReview from '@/components/NPanelReview.vue'
import { onMounted, watch } from 'vue'
import _ from 'lodash'
import { useTourDetail } from '@/composables/useTourDetail'
import { convertionType } from '@/helpers/convertion'
import { handleRoute } from '@/helpers/loadingRoute'
import { validations } from '@/helpers/validate'
import { useTourUtil } from '@/composables/useTour'
import { checkInfo } from '@/helpers/checkSignIn'

const { ruleRequired, ruleQuantity, ruleMaxQuantity } = validations()
const {
  tourInfo,
  bookTour,
  bookingRef,
  anotherTours,
  tourId,
  dialogBooking,
  quantityTour,
  loadingAnotherTours,
  loadingReview,
  dataReview,
  firstPageReview,
  openDialogBooking,
  getReviews,
  getQuantityByStartDate,
  getTourById
} = useTourDetail()
const { addFavoriteTour, removeFavoriteTour } = useTourUtil()
const { formatCurrency, voteText, getPriceDiscount, minDate, getTraffic } = convertionType()
const { isSignIn } = checkInfo()
onMounted(async() => {
  await getTourById(tourId.value)
})
watch(tourId, async(newId) => {
  if (newId){
    await getTourById(newId)
  }
})
</script>

<style lang="scss" scoped>
.tour-container {
  background-image: url('@/assets/img/map-bg.png');
  background-position: center center;
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
  .card-drawer {
    -webkit-mask-image: url("@/assets/img/card-bg.png");
    mask-image: url("@/assets/img/card-bg.png");
    -webkit-mask-size: cover;
    mask-size: cover;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
  }
  .carousel {
    border-bottom: 1px solid var(--loading-bgcolor);
  }
  .el-range-editor .is-active:hover {
      box-shadow: 0 0 0 1px #d32f2f inset;
  }
  .card-design {
    background-color: rgba(159, 159, 159, 0.2);
    width: 374px;
    border-radius: 15px;
    padding: 5px;
  }
  @media screen and (min-width: 1300px) {
    .card-design {
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