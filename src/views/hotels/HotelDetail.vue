<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <v-sheet class="container-detail">
    <v-container fluid class="pa-0">
      <v-sheet>
        <n-carousel :data="hotelInfo?.listImages">
          <template #default>
            <v-row
              class="fill-height mt-n10 ma-2"
              align="center"
              justify="center"
            >
              <h1 class="heading-primary text-custom-shadow">
                <span class="heading-main">{{ hotelInfo?.name }}</span>
              </h1>
            </v-row>
          </template>
        </n-carousel>
      </v-sheet>
      <v-card
        elevation="10"
        class="toolbar rounded-xl"
      >
        <v-card-text>
          <div class="d-flex align-center flex-wrap ma-5">
            <v-text-field
              v-model="bookHotel.startDate"
              label="Ngày nhận phòng"
              name="startDate"
              type="Date"
              :min="minDate(new Date())"
              prepend-icon="mdi-clipboard-text-clock-outline"
              color="primary"
              variant="outlined"
              hide-details="auto"
              class="text-field"
              @update:model-value="() => changeEndDate()"
            />
            <v-text-field
              v-model="bookHotel.endDate"
              label="Ngày trả phòng"
              name="endDate"
              type="Date"
              :min="bookHotel.startDate"
              color="primary"
              variant="outlined"
              hide-details="auto"
              class="text-field ml-2"
            >
              <template #prepend>
                <p class="text-h6 text-disabled mt-n1">{{ countDate }}</p>
                <v-icon class="mx-1" icon="mdi-weather-night" />
              </template>
            </v-text-field>
            <v-btn
              class="text-none mx-5 btn-shadown"
              size="40"
              color="#8a0642"
              min-width="110"
              rounded
              variant="flat"
              @click="() => getRoomByDate({ id: hotelInfo?.id, ...bookHotel })"
            >
              Tìm Kiếm
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
    <v-sheet class="mx-5 rooms-detail">
      <v-row align="center" justify="center">
        <h2 class="heading-secondary">Thông Tin Phòng Khách Sạn</h2>
        <n-panel-loading :loading="loadingRooms" />
      </v-row>
      <v-row
        v-show="!loadingRooms"
        class="mx-5"
        justify="center"
      >
        <v-col
          v-for="room in rooms"
          :key="room?.id"
          cols="12"
          class="room-col"
        >
          <v-card elevation="12" class="card-detail">
            <v-row>
              <v-col>
                <n-carousel :data="room?.listImages" height="300" />
              </v-col>
              <v-col cols="6" class="room-content">
                <h2 class="mt-5 ml-2 font-rowdies">
                  {{ room?.name }}
                </h2>
                <v-card-text class="mt-5">
                  <v-row>
                    <v-col cols="5" class="ml-5">
                      <p class="my-2">
                        <v-icon icon="mdi-bed-queen-outline" />
                        Giường: {{ room?.beds }}
                      </p>
                      <p class="my-2">
                        <v-icon :icon="getIconHuman(room?.adults)" />
                        Người lớn: {{ room?.adults }}
                        <span class="ml-3" v-if="room?.children">
                          <v-icon icon="mdi-teddy-bear" />
                          Trẻ em: {{ room?.children }}
                        </span>
                      </p>
                      <p class="my-2">
                        <v-icon icon="mdi-home-export-outline" />
                        Diện tích phòng: {{ room?.square }}
                      </p>
                      <p class="my-2">
                        <v-icon icon="mdi-home-roof" />
                        Số lượng phòng: {{ room?.quantity }} phòng
                      </p>
                      <p v-show="room?.availableRoomAmount" class="text-red my-2">
                        <v-icon class="mt-n2" icon="mdi-home-variant-outline" />
                        Phòng trống: {{ room?.availableRoomAmount }} phòng
                      </p>
                    </v-col>
                    <v-divider :thickness="2" vertical />
                    <v-col class="mx-5">
                      <div class="h-75 overflow-y-auto" v-html="room?.description" />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-col>
              <v-col :class="_.isEmpty(hotelInfo?.couponData) ? 'custom-normal' : 'custom-voucher'">
                <div class="ml-14 mt-7 pa-4 room-price">
                  <div class="ma-2">
                    <div class="text-h6 animate-charcter my-2">
                      <v-icon
                        icon="mdi-cash-fast"
                        class="animate-charcter"
                      />
                      {{ formatCurrency(getPriceDiscount(room?.price, hotelInfo?.couponData.discountPercent)) }}
                    </div>
                    <p class="mt-3 card-room-text">
                      <v-icon icon="mdi-ticket-percent-outline" />
                      Giá đã bao gồm:
                      Sales & Services tax.
                      <span v-if="!_.isEmpty(hotelInfo?.couponData)">
                        Khuyến mãi trong thời gian có hạn
                        {{ hotelInfo?.couponData.discountPercent }}%!
                      </span>
                    </p>
                    <p
                      v-if="!_.isEmpty(hotelInfo?.couponData)"
                      class="mt-4 mb-1 remove-text"
                    >
                      {{ formatCurrency(room?.price) }}
                    </p>
                  </div>
                  <v-row align="center" justify="end" class="mt-5">
                    <v-divider />
                    <v-text-field
                      v-model="room.amount"
                      :disabled="!room?.availableRoomAmount"
                      :rules="[...ruleQuantity, ruleMaxQuantity(room?.availableRoomAmount)]"
                      density="compact"
                      :min="0"
                      :max="room?.availableRoomAmount"
                      type="number"
                      color="primary"
                      variant="outlined"
                      class="text-field text-field-width mx-3"
                    >
                      <template #prepend>
                        <span>
                          <v-icon icon="mdi-bed-double-outline" />
                          Số lượng:
                        </span>
                      </template>
                    </v-text-field>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-card class="ma-6 pa-5">
        <v-row class="border-black" align="center">
          <v-col cols="10">
            <v-card-title>
              <h3 class="text-primary">
                <v-icon icon="mdi-package-variant-closed-check" />
                Yours Booking Rooms
              </h3>
            </v-card-title>
            <v-card-text>
              <h3 class="ma-5">
                Tổng số phòng đã chọn: {{ totalAmountBook }}
                <v-icon class="mt-n2" :icon="totalAmountBook < 2 ? 'mdi-home-variant-outline' : 'mdi-home-group'" />
              </h3>
              <div class="d-flex ma-5">
                <h3>Tổng tiền:</h3>
                <h2>{{ formatCurrency(totalPrice) }}</h2>
              </div>
            </v-card-text>
          </v-col>
          <v-col>
            <n-dialog-book
              v-model="dialogBooking"
              titleDialog="BOOK HOTEL"
              typeBook="hotel"
              :hotelInfo="hotelInfo"
            >
              <template #action>
                <n-button-animated
                  :disabled="roomsBook.length === 0"
                  :icon="'mdi-checkbox-marked-circle-auto-outline'"
                  label="Booking"
                  width="12rem"
                  @click="dialogBooking=true"
                />
              </template>
            </n-dialog-book>
          </v-col>
        </v-row>
      </v-card>
    </v-sheet>
    <v-container class="px-0 description">
      <v-row class="mx-0">
        <v-col class="px-0">
          <div class="position-relative container-photo">
            <n-image :src="hotelInfo?.listImages[0]" height="600" class="composition-photo" />
          </div>
        </v-col>
        <v-col class="px-0">
          <v-card elevation="12" class="mr-10 card-decs-detail">
            <v-card-text class="mt-5 mx-5 card-desc-text">
              <div class="intro-hotel" v-html="deCodeHtml('section.htdt-description', hotelInfo?.descriptions)[0]" />
              <v-divider class="mx-5 my-2" />
              <div class="d-flex mt-2">
                <n-image
                  v-for="item in hotelInfo?.listImages.slice(2, 5)"
                  :key="item"
                  :src="item"
                  class="mx-1 max-height-150 composition-child-photo"
                />
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                min-width="150"
                class="ma-5 rounded-xl htdt-description-btn"
                prepend-icon="mdi-cloud-arrow-up-outline"
                color="primary"
                variant="tonal"
                @click="() => goToTop()"
              >
                Book now
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="px-0">
      <v-card
        v-if="deCodeHtml('section.htdt-description', hotelInfo?.descriptions)[1] !== '<div></div>'"
        elevation="12"
        class="detail-second"
      >
        <v-card-text class="ma-5">
          <v-row>
            <v-col>
              <div v-html="deCodeHtml('section.htdt-description', hotelInfo?.descriptions)[1]" />
            </v-col>
            <v-col class="custom-c-iamge">
              <n-image class="custom-image" src="https://images.template.net/18017/Travel-Agent-Hotel-Voucher-0.jpg" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
    <v-sheet class="ma-5 pa-5 rounded-xl">
      <v-row>
        <v-col cols="4" class="mt-5">
          <h2>Hotel: {{ hotelInfo?.name }}</h2>
          <p>Address: {{ hotelInfo?.address }}</p>
          <iframe
            :src="`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d30686.57175578836!2d${hotelInfo?.longitude}!3d${hotelInfo?.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1684080267215!5m2!1svi!2s`"
            loading="lazy"
            width= "100%"
            height= "400"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </v-col>
        <v-col cols="8">
          <div v-html="hotelInfo?.rules" />
        </v-col>
      </v-row>
    </v-sheet>
    <n-panel-review
      :id="hotelInfo?.id"
      titlePanel="Hotel"
      :firstPageReview="firstPageReview"
      :loadingReview="loadingReview"
      :dataReview="dataReview"
      @getReview="getReviews"
      @getReviewByPage="getReviews"
    />
    <v-sheet v-if="anotherHotels.length !== 0" color="transparent" class="pa-2">
      <div class="text-center">
        <h2>Những Khách Sạn Khác</h2>
      </div>
      <v-slide-group
        class="pa-4"
        center-active
        selected-class="bg-success"
        show-arrows
      >
        <v-slide-group-item
          v-for="item in anotherHotels"
          :key="item.id"
        >
          <v-card
            class="ma-5"
            width="300"
            @click="()=> handleRoute({ name: 'hotelDetail', params: { id: item?.id } })"
          >
            <n-image
              class="align-end text-white"
              height="300"
              :src="item?.coverPicture"
            >
              <div v-if="!_.isEmpty(hotelInfo?.couponData)" class="mx-2 mt-n1 card-content-coupon" variant="outlined">
                <span class="text-h7 font-weight-bold mx-auto">
                  {{ item?.couponData.discountPercent }}%
                </span>
              </div>
              <div class="card-item-bg">
                <v-card-title class="font-weight-bold">
                  {{ item?.name }}
                  <v-tooltip
                    activator="parent"
                    :text="item?.name"
                    location="top"
                  />
                </v-card-title>
                <v-card-text class="pt-2">
                  <v-row justify-space-between>
                    <v-col>
                      <v-icon class="mr-2" color="primary" icon="mdi-vote-outline" />
                      <v-chip
                        color="primary"
                        size="small"
                        label
                      >
                        <span style="color: #FFF">{{ item?.numReview }}</span>
                      </v-chip>
                    </v-col>
                    <v-col>
                      <v-rating
                        :model-value="item?.rateAverage"
                        color="amber"
                        density="compact"
                        half-increments
                        readonly
                        size="small"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-icon icon="mdi-cash-multiple" size="18" class="ml-1 mb-1 animate-charcter" />
                  <p class="mx-2 animate-charcter">
                    {{ rangePrice(item?.minPrice, item?.maxPrice, item?.couponData.discountPercent) }}
                  </p>
                  <v-spacer />
                  <v-icon
                    size="18"
                    class="mr-3"
                    color="primary"
                    icon="mdi-page-next-outline"
                  />
                </v-card-actions>
              </div>
            </n-image>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </v-sheet>
</template>
<script lang="ts" setup>
import NImage from '@/components/NImage.vue'
import NCarousel from '@/components/NCarousel.vue'
import NPanelLoading from '@/components/NPanelLoading.vue'
import NDialogBook from '@/components/NDialogBook.vue'
import NButtonAnimated from '@/components/NButtonAnimated.vue'
import NPanelReview from '@/components/NPanelReview.vue'
import { onMounted, watch, watchEffect } from 'vue'
import _ from 'lodash'
import '@/assets/scss/hotels/detail.scss'
import { useHotelDetailUtil } from '@/composables/useHotelDetail'
import { convertionType } from '@/helpers/convertion'
import { handleRoute } from '@/helpers/loadingRoute'
import { validations } from '@/helpers/validate'

const {
  anotherHotels,
  hotelInfo,
  rooms,
  bookHotel,
  countDate,
  firstPageReview,
  dataReview,
  loadingReview,
  loadingRooms,
  roomsBook,
  dialogBooking,
  totalAmountBook,
  totalPrice,
  hotelId,
  getHotelById,
  deCodeHtml,
  getRoomByDate,
  getReviews,
  changeEndDate
} = useHotelDetailUtil()
const {
  formatCurrency,
  getPriceDiscount,
  minDate,
  rangePrice,
  getIconHuman
} = convertionType()
const { ruleQuantity, ruleMaxQuantity } = validations()
const goToTop = () => {
  window.scrollTo(0, 0)
}
onMounted(async() => {
  await getHotelById(hotelId.value)
})
watch(hotelId, async(newId) => {
  if (newId) {
    await getHotelById(newId)
  }
})
watchEffect(async() => {
  hotelId.value
  if (hotelId.value) {
    roomsBook.value = rooms.value.filter(item => item.amount > 0)
  }
})
</script>
<style lang="scss" scoped>
.card-room-text {
  font-size: 11px;
}
.htdt-description-btn {
  position: absolute; right: 0; bottom: 0;
}
::v-deep {
    .htdt-policy, .htdt-description {
      background-color: transparent !important;
      p {
        margin-bottom: 10px;
      }
    }
    .font-bold {
      font-weight: bold;
    }
    article {
      line-height: 1.5
    }
    .txt-justify {
      margin-left: 10px;
    }
    .htdt-policy {
      margin-left: 20px;
      margin-right: 20px;
      article {
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .hotelDetailTitle {
        font-size: 30px;
        font-weight: 800;
        padding: 5px;
      }
      .font-bold {
        width: 25%;
      }
      .txt-justify {
        width: 80%;
      }
      .clearfix {
          margin: 20px;
          border-bottom: 1px solid var(--color-border-black);
      }
    }
    .htdt-description {
      p::first-letter {
        font-size: 24px;
        font-weight: bold;
        margin-left: 5px;
      }
      .hotelDetailTitle {
        font-size: 30px;
        font-weight: 800;
        padding: 5px;
      }
    }
    // room css
    .ChildRoomsList-room-bucketspan {
      font-weight: bold;
    }
    .ChildRoomsList-roomFeature-TitleWrapper {
      display: flex;
      span {
        margin-left: 5px;
        margin-right: 5px;
      }
    }
    .RoomFeature__FreeMessage {
      opacity: 0;
    }

  }
</style>