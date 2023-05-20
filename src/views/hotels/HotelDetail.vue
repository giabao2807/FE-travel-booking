<template>
  <v-sheet class="container-detail">
    <v-container fluid class="pa-0">
      <v-sheet>
        <v-carousel
          cycle
          show-arrows="hover"
          hide-delimiters
          hide-delimiter-background
        >
          <v-carousel-item
            v-for="(item, i) in hotelInfo?.listImages"
            :key="i"
            :src="item"
            cover
          >
            <template #placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="primary"
                />
              </v-row>
            </template>
            <template #default>
              <v-row
                class="fill-height mt-n10"
                align="center"
                justify="center"
              >
                <h1 class="heading-primary text-custom-shadow">
                  <span class="heading-main">{{ hotelInfo?.name }}</span>
                </h1>
              </v-row>
            </template>
          </v-carousel-item>
        </v-carousel>
      </v-sheet>
      <v-card
        elevation="10"
        class="toolbar rounded-xl"
      >
        <v-card-text>
          <div class="d-flex align-center flex-wrap ma-5">
            <v-text-field
              v-model="filterDetail.startDate"
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
              v-model="filterDetail.endDate"
              label="Ngày trả phòng"
              name="endDate"
              type="Date"
              :min="filterDetail.startDate"
              color="primary"
              variant="outlined"
              hide-details="auto"
              class="text-field"
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
              @click="() => getRoomByDate()"
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
        <n-panel-loading :loading="rooms.length === 0" />
      </v-row>
      <v-row
        class="mx-5"
        v-for="room in rooms"
        :key="room?.id"
      >
        <v-col col="12">
          <v-card elevation="12" class="card-detail">
            <v-row>
              <v-col>
                <v-carousel
                  class="carousel"
                  height="300"
                  cycle
                  show-arrows="hover"
                  hide-delimiters
                  hide-delimiter-background
                >
                  <v-carousel-item
                    cover
                    eager
                    v-for="(item, i) in room?.listImages"
                    :key="i"
                    :src="item"
                    :lazy-src="item"
                  >
                    <template #placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="primary"
                        />
                      </v-row>
                    </template>
                  </v-carousel-item>
                </v-carousel>
              </v-col>
              <v-col cols="6">
                <v-card-title class="text-h5">
                  {{ room?.name }}
                </v-card-title>
                <v-card-text class="mt-5">
                  <v-row>
                    <v-col class="mx-5">
                      <p class="my-2">
                        <v-icon icon="mdi-bed-queen-outline" />
                        Giường: {{ room?.beds }}
                      </p>
                      <p class="my-2">
                        <v-icon icon="mdi-home-export-outline" />
                        Diện tích phòng: {{ room?.square }}
                      </p>
                      <p class="my-2">
                        <v-icon icon="mdi-home-roof" />
                        Số lượng phòng: {{ room?.quantity }} phòng
                      </p>
                      <p v-show="room?.availableRoomAmount" class="my-2">
                        <v-icon icon="mdi-home-variant-outline" />
                        Phòng trống: {{ room?.availableRoomAmount }} phòng
                      </p>
                    </v-col>
                    <v-col class="mx-5 border-left-black">
                      <div v-html="room?.description" />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-col>
              <v-col class="custom-voucher">
                <div color="transparent" class="ml-14 mt-5 pa-4">
                  <div class="ma-2">
                    <p class="text-subtitle-2">Subject to Cashback Terms</p>
                    <div class="text-h5 animate-charcter my-2">
                      <v-icon icon="mdi-cash-multiple" class="mt-n2 animate-charcter" />
                      {{ formatCurrency(room?.price) }}
                    </div>
                  </div>
                  <p class="my-2 text-caption">
                    Giá đã bao gồm:
                    Sales & Services tax (216.160đ)
                    Khuyến mãi trong thời gian có hạn. Giá phòng đã có giảm giá 0%!
                  </p>
                  <v-btn class="mt-2" color="primary" variant="tonal">Book now</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
    <v-container class="px-0 description">
      <v-row class="mx-0">
        <v-col class="px-0">
          <div class="position-relative">
            <n-image :src="hotelInfo?.listImages[1]" height="600" class="composition__photo" />
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
                  class="mx-1 max-height-150"
                />
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn class="mx-5" color="primary" variant="tonal">Book now</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="px-0">
      <v-card elevation="12" class="detail-second">
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
    <v-sheet class="ma-5 pa-5 rounded-xl">
      <h1 class="my-5 text-center">Reviews Hotel</h1>
      <v-divider class="mx-15" />
      <n-panel-loading :loading="!firstPageReview" />
      <v-slide-group
        class="pa-4"
        center-active
        show-arrows
      >
        <v-slide-group-item
          v-for="review in firstPageReview?.results"
          :key="review?.id"
        >
          <v-card
            elevation="4"
            class="ma-5 pa-2 rounded-xl"
            width="400"
          >
            <v-card-title class="ml-n5">
              <v-row>
                <v-col>
                  <v-list-item>
                    <template #prepend>
                      <v-avatar
                        color="grey-darken-3"
                        :image="review?.owner.avatar"
                      />
                    </template>

                    <v-list-item-title>
                      {{ review?.owner.name }}
                      <br>
                      {{ review?.title }}
                    </v-list-item-title>
                  </v-list-item>
                </v-col>
                <v-col cols="3">
                  <span class="text-caption text-medium-emphasis">
                    {{ new Date(review?.updatedAt).toLocaleDateString("en-GB").split("/").reverse().join("/") }}
                  </span>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-lazy
                :max-height="150"
                :options="{ 'threshold':0.5 }"
                class="overflow-y-auto"
                transition="fade-transition"
              >
                {{ review?.content }}
              </v-lazy>
            </v-card-text>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
      <div class="text-end">
        <v-dialog
          v-model="dialogReview"
          fullscreen
          :scrim="false"
          transition="dialog-bottom-transition"
          width="65%"
        >
          <template #activator="{ props }">
            <v-btn
              class="mx-5"
              color="primary"
              variant="outlined"
              v-bind="props"
              @click="() => getReviews({ id: hotelInfo.id })"
            >
              Xem thêm ...
            </v-btn>
          </template>
          <v-card>
            <v-toolbar
              title="Tất cả reviews"
            >
              <v-btn
                icon
                @click="dialogReview = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-item>
              <n-panel-loading :loading="loadingReview" />
              <v-timeline v-if="!loadingReview" side="end">
                <v-timeline-item
                  v-for="item in dataReview?.results"
                  :key="item.id"
                >
                  <template #icon>
                    <v-avatar
                      color="grey-darken-3"
                      :image="item?.owner.avatar"
                    />
                    <v-tooltip
                      activator="parent"
                      :text="item?.owner.name"
                      location="top"
                    />
                  </template>
                  <v-list-item width="90%">
                    <v-row class="align-center justify-space-between">
                      <v-col cols="9">
                        <h4>{{ item?.title }}</h4>
                        <span class="text-caption text-medium-emphasis">{{ item?.updatedAt }}</span>
                      </v-col>
                      <v-col>
                        <v-rating
                          :model-value="item?.rate"
                          color="amber"
                          density="compact"
                          half-increments
                          readonly
                          class="mr-5"
                          size="small"
                        />
                      </v-col>
                    </v-row>
                    <v-list-item-subtitle class="my-1">{{ item?.content }}</v-list-item-subtitle>
                  </v-list-item>
                </v-timeline-item>
              </v-timeline>
            </v-card-item>
            <div class="text-center">
              <v-pagination
                v-if="dataReview"
                v-model="pageReview"
                :total-visible="5"
                :length="dataReview?.pageNumber"
                @update:modelValue="() => getReviews({ id: hotelInfo.id, page: pageReview })"
              />
            </div>
          </v-card>
        </v-dialog>
      </div>
    </v-sheet>
    <v-sheet color="transparent" class="pa-2">
      <div class="text-center">
        <h2>Những Khách Sạn Khác</h2>
      </div>
      <v-slide-group
        v-model="model"
        class="pa-4"
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
            @click="()=> hanldeRoute({ name: 'hotelDetail', params: { id: item?.id } })"
          >
            <n-image
              class="align-end text-white"
              height="100%"
              :src="item?.coverPicture"
            >
              <div class="mx-2 mt-n1 card-content-coupon" variant="outlined">
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
                        text-color="white"
                      >
                        {{ item?.numReview }}
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
                  <p class="mx-2 animate-charcter">{{ item?.priceRange }}</p>
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
import NPanelLoading from '@/components/NPanelLoading.vue'
import '@/assets/scss/detail.scss'
import { useHotelDetailUtil } from '@/composables/useHotelDetail'
import { convertionType } from '@/helpers/convertion'
import { hanldeRoute } from '@/helpers/loadingRoute'

const {
  anotherHotels,
  hotelInfo,
  rooms,
  filterDetail,
  countDate,
  firstPageReview,
  dataReview,
  dialogReview,
  loadingReview,
  pageReview,
  minDate,
  deCodeHtml,
  getRoomByDate,
  getReviews
} = useHotelDetailUtil()
const { formatCurrency } = convertionType()
const changeEndDate = () => {
  filterDetail.value.endDate = ''
}
</script>
<style lang="scss" scoped>
::v-deep {
  .htdt-policy, .htdt-description {
    background-color: transparent !important;
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