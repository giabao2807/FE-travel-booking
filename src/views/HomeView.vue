<template>
  <v-sheet>
    <v-container fluid class="pa-0">
      <div class="container_main">
        <v-row class="h-50 w-100" align="end" justify="center">
          <h1 class="heading-primary">
            <span class="heading-primary--main">Travels and booking</span>
            <span class="heading-primary--sub">is where life happens is where life</span>
          </h1>
        </v-row>
      </div>
      <v-card
        elevation="10"
        class="home-toolbar rounded-xl"
      >
        <v-card-text>
          <v-text-field
            label="City"
            name="city"
            prepend-icon="mdi-map-marker-radius-outline"
            color="primary"
            variant="underlined"
            hide-details="auto"
            class="mx-5"
          />
          <div class="d-flex align-center flex-wrap ma-5">
            <v-text-field
              label="Start Date"
              name="startDate"
              type="Date"
              prepend-icon="mdi-clipboard-text-clock-outline"
              color="primary"
              variant="underlined"
              hide-details="auto"
              class="mr-5"
            />
            <v-text-field
              label="End Date"
              name="endDate"
              type="Date"
              color="primary"
              variant="underlined"
              hide-details="auto"
            >
              <template #prepend>
                <v-icon class="mx-1" icon="mdi-weather-night" />
              </template>
            </v-text-field>
          </div>
          <div class="d-flex align-center flex-wrap ma-5">
            <v-icon icon="mdi-map-legend text-disabled" size="25" />
            <v-label text="Options:" class="mx-2" />
            <v-radio-group
              inline
              hide-details
              class="ml-5"
            >
              <v-radio
                label="Tours"
                value="radio-1"
                class="mx-4"
              />
              <v-radio
                label="Hotels"
                value="radio-2"
              />
            </v-radio-group>
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
    </v-container>
    <v-container fluid class="home-panel-tour">
      <div class="text-align-center">
        <h2 class="heading-secondary">
          Điểm đến yêu thích trong nước
        </h2>
      </div>
      <v-divider :thickness="2" class="mx-15" />
      <v-row class="ma-5">
        <v-col v-for="item in getCitiesPanel" :key="item.id" :cols="item.col">
          <n-image :src="item?.image" height="300" class="image-transform">
            <template #default>
              <div class="d-flex align-center justify-center fill-height image-container">
                <span class="text">{{ item?.name }}</span>
              </div>
            </template>
          </n-image>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <div class="text-align-center">
        <h2 class="heading-secondary">
          Những Tour Du Lịch Hấp Dẫn
        </h2>
      </div>
      <v-row>
        <v-col
          v-for="tour in popularTours"
          :key="tour?.id"
        >
          <v-card
            class="mx-auto my-12 rounded-xl bg-theme-status"
            elevation="8"
            width="340"
            @click="() => hanldeRoute({ name: 'tourDetail', params: { id: tour?.id } })"
          >
            <n-image
              class="align-end text-white"
              height="200"
              :src="tour?.coverPicture"
            >
              <v-card-title class="title-animation-tour font-weight-bold">
                {{ tour?.name }}
                <v-tooltip
                  width="300"
                  activator="parent"
                  :text="tour?.name"
                  location="top"
                />
              </v-card-title>
            </n-image>
            <v-card-subtitle class="mt-4">
              <span class="me-1">{{ tour?.city }} Favorite</span>
              <v-icon
                color="error"
                icon="mdi-fire-circle"
                size="small"
              />
            </v-card-subtitle>
            <v-card-text>
              <v-row
                align="center"
                class="mx-0"
              >
                <v-rating
                  :model-value="tour.rate"
                  color="amber"
                  density="compact"
                  half-increments
                  readonly
                  size="small"
                />
                <div class="text-grey ms-4">
                  {{ tour.rate }} ({{ tour.numReview }})
                </div>
              </v-row>
              <div class="d-flex align-center justify-space-between my-5">
                <div class="text-subtitle-1 animate-charcter">
                  <v-icon icon="mdi-cash-multiple" class="mt-n2 animate-charcter" />
                  {{ formatCurrency(tour?.price) }}
                </div>
                <div>
                  <v-icon
                    v-for="item in getTraffic(tour?.traffics)"
                    :key="item.value"
                    :icon="item?.icon"
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
                <v-chip label color="primary">{{ tour?.totalDays }}</v-chip>
              </div>
              <div>
                <v-icon icon="mdi-calendar-start-outline" color="primary" />
                Khởi hành: {{ tour?.departure }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="deep-purple-lighten-2"
                variant="text"
              >
                See More...
              </v-btn>
            </v-card-actions>
            <div class="group-hover:-rotate-[4deg] animation-card-tour transition-transform" />
            <div class="group-hover:-rotate-[8deg] animation-card-tour transition-transform" />
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center">
        <n-panel-loading />
        <n-button-animated
          label="Discover our tours"
          width="20rem"
          fontSize="1rem"
          @click="() => hanldeRoute({ name: 'tours' })"
        />
      </div>
    </v-container>
    <v-container fluid class="section-features my-15">
      <div class="text-align-center">
        <h2 class="heading-panel-2 mt-n2">
          Những khách sạn nổi bật
        </h2>
      </div>
      <v-row class="ma-5 mb-10" align="center" justify="center">
        <v-slide-group
          v-model="selectedCity"
          show-arrows
          mandatory
          center-active
          class="width-80 font-weight-600"
        >
          <v-slide-group-item
            v-for="city in recomendCities"
            :key="city?.id"
            :value="city?.id"
            v-slot="{ isSelected, toggle }"
          >
            <div class="align-center justify-center">
              <v-btn
                class="mx-5 title-group"
                size="large"
                rounded
                variant="text"
                :color="isSelected ? 'primary' : '#fff'"
                @click="()=>{
                  getRecomendHotelByCity(city?.id)
                  toggle()
                }"
              >
                {{ city?.name }}
              </v-btn>
              <div v-show="isSelected" class="mt-n3 ml-10 mb-n2">
                <svg class="image-container" width="100" viewBox="0 0 83 7" fill="none">
                  <path d="M1.36658 3.43961C5.25984 2.21819 9.10198 2.35113 13.042 1.74498C16.5973 1.19801 20.2829 1.33594 23.9226 1.33594C27.3725 1.33594 30.9056 1.5463 34.2891 1.5463C35.5441 1.5463 37.2693 2.05276 38.3912 2.55139C39.6341 3.10379 41.4642 3.25919 42.8089 3.4513C44.602 3.70745 46.3029 3.86034 48.1616 3.86034C49.0606 3.86034 49.9761 3.43961 50.9081 3.43961C51.4475 3.43961 52.841 3.17686 53.3273 2.97213C55.1318 2.21235 56.3597 3.3818 57.5346 4.49145C58.2657 5.18187 59.2379 3.46932 60.0123 3.18249C60.9779 2.82484 61.679 2.53519 62.4783 3.33443C62.7994 3.65557 63.8588 5.51258 64.3716 5.22773C65.485 4.60917 66.7235 4.15447 67.7258 3.33443C69.0587 2.24383 71.3278 2.48068 73 2.38777C74.4626 2.30652 75.525 2.05998 77 2.38777C77.7415 2.55256 78.7556 2.38777 79.518 2.38777C80.2804 2.38777 81.1728 1.74498 82 1.74498" stroke="#8a0642" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </div>
            </div>
          </v-slide-group-item>
        </v-slide-group>
      </v-row>
      <n-skeleton-loader class="mx-6" :loading="loading" :quantity="8" />
      <v-row v-if="!loading" class="mx-6">
        <v-col
          v-for="hotel in hotels"
          :key="hotel?.id"
          md="3"
        >
          <v-card
            class="element-card mt-5"
            @click="()=> hanldeRoute({ name: 'hotelDetail', params: { id: hotel?.id } })"
          >
            <n-image
              class="align-end text-white"
              height="100%"
              :src="hotel.coverPicture"
            >
              <div
                class="ma-2" variant="outlined" style="
              position: absolute; top: 0; right: 0;
              background-image: url('@/assets/img/coupon.png');
              background-size: cover;"
              >
                <span class="font-weight-600">
                  {{ hotel?.couponData.discountPercent }}%
                </span>
              </div>
              <div class="background-card-title">
                <v-card-title class="title-animation font-weight-bold">
                  {{ hotel?.name }}
                  <v-tooltip
                    activator="parent"
                    :text="hotel?.name"
                    location="top"
                  />
                </v-card-title>
                <v-card-text class="pt-2">
                  <v-row align="center" justify="center">
                    <v-col>
                      <div>
                        <v-icon :icon="voteText(hotel?.rateAverage).icon" color="primary" class="mr-1" />
                        <strong class="text-disabled">{{ voteText(hotel?.rateAverage).name }}</strong>
                      </div>
                    </v-col>
                    <v-col>
                      <v-rating
                        :model-value="hotel?.rateAverage"
                        color="amber"
                        density="compact"
                        half-increments
                        readonly
                        size="small"
                      />
                    </v-col>
                  </v-row>
                  <div class="mt-2">
                    <v-icon color="primary" icon="mdi-vote-outline" />
                    <strong class="text-disabled font-size-min-rem ml-2 mb-n2">Đánh giá -
                      <v-chip
                        color="primary"
                        size="small"
                        label
                        text-color="white"
                      >
                        {{ hotel?.numReview }}
                      </v-chip>
                    </strong>
                  </div>
                </v-card-text>
                <v-divider color="#000" class="mx-5" />
                <div class="ma-2 height-40px">
                  <v-icon color="primary" icon="mdi-map-marker-outline" />
                  <span class="text-disabled font-size-min-rem">{{ hotel.address }}</span>
                </div>
                <v-card-actions>
                  <v-icon icon="mdi-cash-multiple" size="18" class="ml-1 mb-1 animate-charcter" />
                  <p class="mx-2 animate-charcter">{{ hotel?.priceRange }}</p>
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
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
<script lang="ts" setup>
import NButtonAnimated from '@/components/NButtonAnimated.vue'
import NPanelLoading from '@/components/NPanelLoading.vue'
import NSkeletonLoader from '@/components/NSkeletonLoader.vue'
import NImage from '@/components/NImage.vue'
import { hanldeRoute } from '@/helpers/loadingRoute'
import { useHomeUtil } from '@/composables/useHomeUtil'
import { convertionType } from '@/helpers/convertion'

const {
  recomendCities,
  selectedCity,
  hotels,
  loading,
  popularTours,
  getCitiesPanel,
  getTraffic,
  voteText,
  getRecomendHotelByCity
} = useHomeUtil()
const { formatCurrency } = convertionType()
</script>
<style scoped>
@import '@/assets/css/home.css';
.image-transform:hover {
  transform: scale(1.08);
  z-index: 2;
}
.image-container:hover {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    overflow: hidden;
    outline: 2px solid var(--color-border-white);
    outline-offset: -15px;
    box-shadow: 5px 10px 40px 5px rgba(0,0,0,0.5);
}
.image-container .text {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-border-white);
}
.home-toolbar {
  width: 60%;
  position: absolute;
  left: 50%;
  margin-top: -50px;
  transform: translate(-50%, -50%);
  border-top: 12px solid var(--color-boni-like);
  z-index: 1;
}
</style>
