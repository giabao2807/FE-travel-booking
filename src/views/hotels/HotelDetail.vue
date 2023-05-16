<template>
  <v-sheet class="container-detail">
    <v-sheet>
      <v-sheet>
        <v-carousel
          cycle
          show-arrows="hover"
          hide-delimiters
          hide-delimiter-background
        >
          <v-carousel-item
            v-for="(item, i) in hotel?.listImages"
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
                class="fill-height ma-0"
                align="start"
                justify="center"
              >
                <h1 class="heading-primary text-custom-shadow">
                  <span class="heading-primary--main">{{ hotel?.name }}</span>
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
    </v-sheet>
    <v-sheet class="mx-5 rooms-detail">
      <v-row align="center" justify="center">
        <h2 class="heading-secondary">Thông Tin Phòng Khách Sạn</h2>
        <n-panel-loading />
      </v-row>
      <v-row
        class="mx-5"
        v-for="room in rooms"
        :key="room?.id"
      >
        <v-col v-if="!loading" col="12">
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
                  <div class="my-2">
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
            <n-image :src="hotel?.listImages[1]" height="600" class="composition__photo" />
          </div>
        </v-col>
        <v-col class="px-0">
          <v-card elevation="12" class="mr-10 card-decs-detail">
            <v-card-text class="mt-5 mx-5 card-desc-text">
              <div class="intro-hotel" v-html="deCodeHtml('section.htdt-description', hotel?.descriptions)[0]" />
              <v-divider class="mx-5 my-2" />
              <div class="d-flex mt-2">
                <n-image
                  v-for="item in hotel?.listImages.slice(2, 5)"
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
              <div v-html="deCodeHtml('section.htdt-description', hotel?.descriptions)[1]" />
            </v-col>
            <v-col class="custom-c-iamge">
              <n-image class="custom-image" src="https://images.template.net/18017/Travel-Agent-Hotel-Voucher-0.jpg" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
    <v-sheet />
    <v-sheet class="ma-5 pa-5 rounded-xl">
      <div v-html="hotel?.rules" />
    </v-sheet>
    <v-sheet class="ma-5 rounded-xl">
      <n-map />
      <v-row class="ma-5 justify-space-around h-75">
        <v-col cols="5">
          <iframe
            :src="`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d30686.57175578836!2d${hotel?.longitude}!3d${hotel?.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1684080267215!5m2!1svi!2s`"
            loading="lazy"
            width= "100%"
            height= "400"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </v-col>
        <v-col cols="7">
          <h2>Hotel: {{ hotel?.name }}</h2>
          <p><strong>Address: </strong>{{ hotel?.address }}</p>
        </v-col>
      </v-row>
    </v-sheet>
  </v-sheet>
</template>
<script lang="ts" setup>
import NImage from '@/components/NImage.vue'
import NPanelLoading from '@/components/NPanelLoading.vue'
import NMap from '@/components/NMap.vue'
import '@/assets/scss/detail.scss'
import { useHotelUtil } from '@/composables/useHotel'
import { convertionType } from '@/helpers/convertion'
import { usePanelLoading } from '@/composables/usePanelLoading'

const { loading } = usePanelLoading()
const {
  hotel,
  rooms,
  filterDetail,
  countDate,
  minDate,
  deCodeHtml,
  getRoomByDate
} = useHotelUtil()
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
      width: 15%;
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