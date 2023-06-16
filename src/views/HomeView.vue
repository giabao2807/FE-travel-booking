<template>
  <v-sheet class="home-container">
    <v-container fluid class="pa-0">
      <div class="container_main">
        <v-row class="h-50 w-100" align="end" justify="center">
          <h1 class="heading-primary shadow-text">
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
          <n-cities-select
            v-model="filterPanel.cityId"
            prependIcon="mdi-map-marker-radius-outline"
            class="ma-5"
          />
          <div class="d-flex align-center flex-wrap ma-5">
            <v-text-field
              v-model="filterPanel.startDate"
              :min="minDate(new Date())"
              label="Start Date"
              name="startDate"
              type="Date"
              prepend-icon="mdi-clipboard-text-clock-outline"
              color="primary"
              variant="underlined"
              hide-details="auto"
              class="mr-5"
              @update:model-value="() => changeEndDate()"
            />
            <v-text-field
              v-model="filterPanel.endDate"
              :min="filterPanel.startDate"
              label="End Date"
              name="endDate"
              type="Date"
              color="primary"
              variant="underlined"
              hide-details="auto"
            >
              <template #prepend>
                <p class="text-h6 text-disabled mt-n1 font-rowdies">{{ countDate }}</p>
                <v-icon class="mx-1" icon="mdi-weather-night" />
              </template>
            </v-text-field>
          </div>
          <div class="d-flex align-center flex-wrap ma-5">
            <v-icon icon="mdi-map-legend text-disabled" size="25" />
            <v-label text="Options:" class="mx-2" />
            <v-radio-group
              v-model="flagSearch"
              inline
              hide-details
              class="ml-5"
            >
              <v-radio
                v-for="item in SEARCH_FOR"
                :key="item"
                :value="item"
                :label="item"
                class="mx-4"
              />
            </v-radio-group>
            <v-btn
              class="text-none mx-7"
              color="primary"
              rounded
              :prepend-icon="flagSearch === 'Tours' ? 'mdi-airplane-search' : 'mdi-bed-double-outline'"
              min-width="110"
              variant="outlined"
              @click="() => handleFilter()"
            >
              Tìm Kiếm
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
    <v-container fluid class="home-panel-city">
      <div class="text-align-center">
        <h2 class="heading-secondary font-bungee my-5">
          Điểm đến yêu thích trong nước
        </h2>
      </div>
      <v-row class="ma-5">
        <v-col v-for="item in getCitiesPanel" :key="item.id" :cols="item.col">
          <n-image
            :src="item?.image"
            height="300"
            class="image-transform"
            @click="() => {
              filterPanel.cityId = item.id
              handleFilter()
            }"
          >
            <template #default>
              <div class="d-flex align-center justify-center fill-height image-container">
                <p class="text shadow-text font-size-20">{{ item?.name }}</p>
              </div>
            </template>
          </n-image>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class="home-panel-tour">
      <div class="text-align-center">
        <h2 class="heading-secondary font-bungee">
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
            width="310"
            height="420"
            @click="() => handleRoute({ name: 'tourDetail', params: { id: tour?.id } })"
          >
            <n-image
              class="align-end text-white"
              height="180"
              :src="tour?.coverPicture"
            >
              <div
                v-if="Object.keys(tour?.couponData).length !== 0"
                class="mx-2 mt-n1 home-tour-coupon"
                variant="outlined"
              >
                <span class="font-weight-bold font-size-15 mx-auto">
                  {{ tour?.couponData.discountPercent }}%
                </span>
              </div>
              <v-card-title
                class="font-rowdies font-weight-bold shadow-text"
              >
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
                  {{ tour?.rate }} ({{ tour?.numReview }})
                </div>
              </v-row>
              <div
                v-if="Object.keys(tour?.couponData).length !== 0"
                class="mt-5 remove-text text-grey-darken-2"
              >
                {{ formatCurrency(tour?.price) }}
              </div>
              <div class="d-flex align-center justify-space-between my-3">
                <div class="text-subtitle-1 animate-charcter">
                  <v-icon icon="mdi-cash-multiple" class="mt-n2 animate-charcter" />
                  {{
                    formatCurrency(
                      getPriceDiscount(tour?.price, tour?.couponData.discountPercent)
                    )
                  }}
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
            <v-btn
              class="font-rowdies button-card-tour"
              color="primary"
              variant="text"
            >
              See More...
            </v-btn>
            <div class="group-hover:-rotate-[4deg] animation-card-tour transition-transform" />
            <div class="group-hover:-rotate-[8deg] animation-card-tour transition-transform" />
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center">
        <n-panel-loading :loading="popularTours.length === 0" />
        <n-button-animated
          label="Discover our tours"
          width="20rem"
          @click="() => handleRoute({ name: 'tours' })"
        />
      </div>
    </v-container>
    <v-container fluid class="section-features my-15">
      <div class="text-align-center">
        <h2 class="heading-panel-2 font-bungee mt-n2">
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
                class="mx-5 title-group font-weight-600"
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
      <n-skeleton-loader class="mx-6" :loading="loadingPanelHotel" :quantity="8" />
      <v-row v-if="!loadingPanelHotel" class="mx-6">
        <v-col
          v-for="hotel in popularHotels"
          :key="hotel?.id"
          md="3"
        >
          <v-card
            class="element-card mt-5"
            @click="()=> handleRoute({ name: 'hotelDetail', params: { id: hotel?.id } })"
          >
            <n-image
              class="align-end text-white"
              height="40%"
              :src="hotel?.coverPicture"
            >
              <div
                v-if="Object.keys(hotel?.couponData).length !== 0"
                class="mx-2 mt-n1 home-coupon"
                variant="outlined"
              >
                <span class="font-weight-bold font-size-15 mx-auto">
                  {{ hotel?.couponData.discountPercent }}%
                </span>
              </div>
            </n-image>
            <div class="background-card-title">
              <v-card-title class="font-rowdies font-weight-bold">
                {{ hotel?.name }}
                <v-tooltip
                  activator="parent"
                  :text="hotel?.name"
                  location="top"
                />
              </v-card-title>
              <v-card-text class="pt-2">
                <v-row class="pa-0" align="center" justify="center">
                  <v-col>
                    <v-icon :icon="voteText(hotel?.rateAverage).icon" color="primary" class="mr-1" />
                    <strong class="font-size-min-rem">{{ voteText(hotel?.rateAverage).name }}</strong>
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
                <v-row class="mt-0 pa-0" align="center" justify="center">
                  <v-col>
                    <v-icon color="primary" icon="mdi-vote-outline" />
                    <strong class="font-size-min-rem ml-2 mb-n3">Đánh giá</strong>
                  </v-col>
                  <v-col>
                    <v-chip
                      color="primary"
                      size="small"
                      label
                      text-color="white"
                    >
                      {{ hotel?.numReview }}
                    </v-chip>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-divider color="#000" class="mx-5" />
              <div class="mx-3 my-1 height-40px">
                <v-icon color="primary" icon="mdi-map-marker-outline" />
                <span class="font-size-min-rem">{{ hotel?.address }}</span>
              </div>
              <v-card-actions class="mx-2">
                <v-icon icon="mdi-cash-multiple" size="18" class="mb-1 animate-charcter" />
                <p class="mx-2 animate-charcter">
                  {{ rangePrice(hotel?.minPrice, hotel?.maxPrice, hotel?.couponData.discountPercent) }}
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
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="mt-10">
      <div class="text-center mb-8">
        <h3 class="text-primary text-uppercase">Services</h3>
        <h1 class="heading-secondary font-bungee mt-n2">Tours & Travel Services</h1>
      </div>
      <v-row>
        <v-col>
          <v-card width="350" height="300">
            <v-card-text class="text-center">
              <v-icon size="50" icon="mdi-compass-rose" />
              <h2 class="ma-5">Travel Guide</h2>
              <p class="ma-5">
                Travel information to inspire global travelers.
                From cities to airports, cruise ports to ski and beach resorts, attractions to events, our guides provide ...
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card width="350" height="300">
            <v-card-text class="text-center">
              <v-icon size="50" icon="mdi-ticket-percent-outline" />
              <h2 class="ma-5">Ticket Booking</h2>
              <p class="ma-5">
                Enjoy Easy Cancellation & Instant Refunds with Flexible Date Change of Flight Tickets.
                Easily compare and book from a wide selection of International flights on MakeMyTrip.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card width="350" height="300">
            <v-card-text class="text-center">
              <v-icon size="50" icon="mdi-home-city-outline" />
              <h2 class="ma-5">Hotel Booking</h2>
              <p class="ma-5">I just made a hotel booking for my upcoming trip to ensure a comfortable stay during my travels.</p>
            </v-card-text>
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
import NCitiesSelect from '@/components/NCitiesSelect.vue'
import NImage from '@/components/NImage.vue'
import { SEARCH_FOR } from '@/resources/mockData'
import { handleRoute } from '@/helpers/loadingRoute'
import { useHomeUtil } from '@/composables/useHomeUtil'
import { convertionType } from '@/helpers/convertion'

const {
  recomendCities,
  selectedCity,
  popularHotels,
  popularTours,
  getCitiesPanel,
  loadingPanelHotel,
  countDate,
  filterPanel,
  flagSearch,
  changeEndDate,
  getRecomendHotelByCity,
  handleFilter
} = useHomeUtil()
const {
  formatCurrency,
  voteText,
  getPriceDiscount,
  minDate,
  rangePrice,
  getTraffic
} = convertionType()
</script>
<style scoped>
@import '@/assets/css/home.css';
.button-card-tour {
  position: absolute !important;
  bottom: 0;
  right: 0;
}
</style>
