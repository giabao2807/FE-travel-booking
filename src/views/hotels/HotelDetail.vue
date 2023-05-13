<template>
  <v-sheet class="container-detail">
    <v-sheet>
      <v-sheet>
        <n-image :src="hotel?.coverPicture" height="500" aspect-ratio="16/9">
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
        </n-image>
      </v-sheet>
      <v-card
        elevation="10"
        class="toolbar"
      >
        <v-card-text>
          <div class="d-flex align-center flex-wrap ma-5">
            <v-text-field
              label="Ngày nhận phòng"
              name="startDate"
              prepend-icon="mdi-clipboard-text-clock-outline"
              type="Date"
              :min="minDate"
              color="primary"
              hide-details="auto"
              class="text-field"
              variant="outlined"
            />
            <v-text-field
              label="Ngày trả phòng"
              name="endDate"
              type="Date"
              color="primary"
              prepend-icon="mdi-fast-forward-outline"
              variant="outlined"
              hide-details="auto"
              class="text-field"
            />
            <v-btn
              class="text-none mx-5 btn-shadown"
              size="40"
              color="#8a0642"
              min-width="110"
              rounded
              variant="flat"
            >
              Tìm Kiếm
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-sheet>
    <v-sheet class="mx-5 description">
      <v-row
        class="mx-5"
        v-for="room in rooms"
        :key="room?.id"
      >
        <v-col col="12">
          <v-card class="card-detail" height="300">
            <div class="d-flex flex-no-wrap justify-between">
              <v-carousel
                class="carousel"
                height="300"
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
                />
                <template #placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="red"
                    />
                  </v-row>
                </template>
              </v-carousel>
              <div>
                <v-card-title class="text-h5">
                  {{ room?.name }}
                </v-card-title>
                <v-card-subtitle v-html="room?.description" />
                <v-card-actions>
                  <v-btn
                    class="ms-2"
                    variant="outlined"
                    size="small"
                  >
                    Booking Now
                  </v-btn>
                </v-card-actions>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
    <v-container class="px-0 description">
      <v-row class="mx-0">
        <v-col class="px-0">
          <div class="position-relative">
            <n-image :src="hotel?.coverPicture" height="600" class="composition__photo" />
          </div>
        </v-col>
        <v-col class="px-0">
          <v-card elevation="12" class="mr-10 card-decs-detail">
            <v-card-text class="ma-5 card-desc-text">
              <div class="intro-hotel" v-html="deCodeHtml('section.htdt-description', hotel?.descriptions)[0]" />
              <v-divider class="mx-5 my-2" />
              <div class="d-flex">
                <n-image :src="hotel?.coverPicture" />
                <n-image class="ml-2" :src="hotel?.coverPicture" />
                <n-image class="ml-2" :src="hotel?.coverPicture" />
              </div>
            </v-card-text>
            <v-card-actions>
              <a href="" class="btn btn-primary">Book Now</a>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="px-0">
      <v-card elevation="12" class="detail-second">
        <v-card-text class="ma-5">
          <div v-html="deCodeHtml('section.htdt-description', hotel?.descriptions)[1]" />
        </v-card-text>
      </v-card>
    </v-container>
    <v-sheet />
  </v-sheet>
</template>
<script lang="ts" setup>
import NImage from '@/components/NImage.vue'
import { useHotelUtil } from '@/composables/useHotel'
import { convertionType } from '@/helpers/convertion'
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const hotelId = route.params.id as string
const { hotel, rooms, getHotelById } = useHotelUtil()
const { deCodeHtml } = convertionType()
const minDate = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today.toISOString().split('T')[0]
})
onMounted(() => {
  getHotelById(hotelId)
})
</script>
<style scoped>
@import '@/assets/scss/detail.scss';
.card-desc-text {
  height: 80%;
}
.card-expansion {
  top: 0;
  left: 0;
  z-index: 2;
}
::v-deep .htdt-policy,::v-deep .htdt-description {
  background-color: transparent !important;
}
::v-deep .hotelDetailTitle {
  font-size: 30px;
  font-weight: 800;
  padding: 5px;
}
::v-deep .txt-justify {
  margin: 5px;
}
::v-deep .htdt-description p::first-letter {
  font-size: 24px;
  font-weight: bold;
  margin-left: 5px;
}
</style>