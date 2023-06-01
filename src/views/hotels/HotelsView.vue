<template>
  <v-sheet class="hotels-page">
    <v-container fluid class="pa-0">
      <div class="container_hotels">
        <v-row class="h-50 w-100" align="end" justify="center">
          <h1 class="heading-primary shadow-text">
            <span class="heading-primary--main">Hotels</span>
            <span class="heading-primary--sub">is where life happens is where life</span>
          </h1>
        </v-row>
      </div>
    </v-container>
    <v-layout>
      <v-navigation-drawer
        width="350"
        floating
        permanent
      >
        <v-card class="pa-2">
          <h3 class="text-center">Search Hotel</h3>
          <v-card-text>
            <h4>Thông tin đặt hotel</h4>
            <n-cities-select v-model="initFilterHotel.cityId" class="mx-2 mb-5" />
            <v-row class="mx-2" align="center">
              <v-col cols="3">
                <p class="text-h7 text-disabled font-rowdies">
                  {{ countDate }}
                  <v-icon class="mt-n2" icon="mdi-weather-night" />
                </p>
              </v-col>
              <v-col class="px-0">
                <v-text-field
                  v-model="initFilterHotel.startDate"
                  :min="minDate(new Date())"
                  label="Start Date"
                  name="startDate"
                  type="Date"
                  color="primary"
                  variant="underlined"
                  hide-details="auto"
                  class="mb-1"
                />
                <v-text-field
                  v-model="initFilterHotel.endDate"
                  :min="initFilterHotel.startDate"
                  label="End Date"
                  name="endDate"
                  type="Date"
                  color="primary"
                  variant="underlined"
                  hide-details="auto"
                  class="mt-1"
                />
              </v-col>
            </v-row>
            <h4 class="my-5">Khoảng giá hotel</h4>
            <v-row>
              <v-range-slider
                :max="10"
                :min="0"
                :step="1"
                hide-details
                class="mx-8 my-5"
                thumb-label="always"
              />
            </v-row>
            <v-row justify="center">
              <v-btn class="mx-2">
                Clear
              </v-btn>
              <v-btn
                class="mx-2"
                @click="() => getHotelsByFilterPanel()"
              >
                Search
              </v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-navigation-drawer>
      <v-main class="ma-5">
        <v-card elevation="3" class="mb-5">
          <v-card-text>
            <h3 class="ma-2">
              <v-icon icon="mdi-map-search-outline" />
              Những Khách Sạn Hot
              <span v-if="initFilterHotel?.cityId"> ở {{ getCityById(initFilterHotel?.cityId)?.name }}</span>
              <span v-if="initFilterHotel?.endDate"> từ ngày {{ initFilterHotel?.startDate }} đến {{ initFilterHotel?.endDate }}</span>
            </h3>
          </v-card-text>
        </v-card>
        <n-panel-loading :loading="loadingHotels" />
        <v-container class="my-5">
          <v-row v-if="!loadingHotels">
            <v-col v-for="item in hotels?.results" :key="item?.id" cols="12">
              <v-card
                elevation="0"
                class="my-5 hotel-card"
                color="transparent"
                @click="() => handleRoute({ name: 'hotelDetail', params: { id: item?.id } })"
              >
                <v-row>
                  <v-col cols="5">
                    <n-image :src="item?.coverPicture" height="300" />
                  </v-col>
                  <v-col cols="7">
                    <h1 class="mt-5 ml-2">
                      {{ item?.name }}
                    </h1>
                    <v-card-text class="mx-3 mt-n1">
                      <v-row align="center" class="my-3">
                        <v-icon :icon="voteText(item?.rateAverage).icon" color="primary" class="mr-1" />
                        <strong class="font-size-min-rem">{{ voteText(item?.rateAverage).name }}</strong>
                        <v-rating
                          :model-value="item?.rateAverage"
                          class="mx-5"
                          color="amber"
                          density="compact"
                          half-increments
                          readonly
                          size="small"
                        />
                      </v-row>
                      <v-row align="center" class="my-3">
                        <v-icon color="primary" icon="mdi-vote-outline" />
                        <strong class="font-size-min-rem mr-5">Đánh giá:</strong>
                        <v-chip
                          color="primary"
                          size="small"
                          label
                          text-color="white"
                        >
                          {{ item?.numReview }}
                        </v-chip>
                      </v-row>
                      <v-row class="my-3">
                        <v-icon color="primary" icon="mdi-map-marker-radius-outline" />
                        <strong class="font-size-min-rem">Địa chỉ:</strong>
                        <v-col class="pa-0 ml-5" cols="5">
                          {{ item?.address }}
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <div class="card-actions">
                      <v-row>
                        <v-col>
                          <p v-if="item?.couponData" class="text-caption animate-charcter">
                            <v-icon icon="mdi-home-city-outline" class="animate-charcter" />
                            Ưu đãi khách sạn - {{ item?.couponData.discountPercent }}%
                          </p>
                          <p v-if="item?.couponData" class="remove-text">{{ rangePrice(item?.minPrice, item?.maxPrice) }}</p>
                          <h3 class="animate-charcter">
                            {{ rangePrice(item?.minPrice, item?.maxPrice, item?.couponData.discountPercent) }}
                          </h3>
                        </v-col>
                      </v-row>
                      <v-row justify="end">
                        <v-btn
                          class="text-none"
                          prepend-icon="mdi-dots-vertical"
                          color="primary"
                          variant="tonal"
                        >
                          See More...
                        </v-btn>
                      </v-row>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <n-pagination
            v-if="hotels?.results"
            class="my-5"
            v-model="pageHotel"
            :length="hotels?.pageNumber"
            @change="() => getHotelsByFilterPanel({ page: pageHotel })"
          />
        </v-container>
      </v-main>
    </v-layout>
  </v-sheet>
</template>
<script lang="ts" setup>
import NImage from '@/components/NImage.vue'
import NPanelLoading from '@/components/NPanelLoading.vue'
import NPagination from '@/components/NPagination.vue'
import NCitiesSelect from '@/components/NCitiesSelect.vue'
import { onMounted } from 'vue'
import { convertionType } from '@/helpers/convertion'
import { handleRoute } from '@/helpers/loadingRoute'
import { useHotelUtil } from '@/composables/useHotel'
import { useCities } from '@/composables/useCities'

const {
  hotels,
  pageHotel,
  countDate,
  loadingHotels,
  initFilterHotel,
  getHotelsByFilterPanel
} = useHotelUtil()
const { rangePrice, voteText, minDate } = convertionType()
const { getCityById } = useCities()
onMounted(() => {
  getHotelsByFilterPanel()
})
</script>
<style lang="scss" scoped>
.hotels-page {
  .container_hotels {
    background-image: linear-gradient(to bottom, rgba(248, 230, 248, 0.2), rgba(235, 178, 244, 0.2)),
      url('@/assets/img/bg-hotel.jpeg');
    background-size: cover;
    height: 500px;
  }

  .card-actions {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: 25px;
    margin-bottom: 25px;
  }

  .hotel-card {
    width: 95%;
    cursor: pointer;
    transition: all 0.6s cubic-bezier(0.680, -0.550, 0.265, 1.550);
  }

  .hotel-card:hover {
    transform: translateY(-1.3rem) scale(1.05);
  }
}
</style>