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
    <v-row>
      <v-col>
        <v-card elevation="3" class="card-search ma-3 rounded-xl">
          <h3 class="text-center my-3">
            <v-icon icon="mdi-map-search-outline" />
            Search Hotels
          </h3>
          <v-form ref="formSearchRef">
            <v-card-text>
              <h4 class="mb-2">Thông tin đặt</h4>
              <n-cities-select v-model="filtersHotels.cityId" class="mx-2" />
              <v-text-field
                v-model="filtersHotels.startDate"
                :min="minDate(new Date())"
                label="Start Date"
                name="startDate"
                type="Date"
                color="primary"
                class="mt-2 mx-2"
                variant="underlined"
                hide-details="auto"
              />
              <v-text-field
                v-model="filtersHotels.startDate"
                :min="filtersHotels.startDate"
                label="End Date"
                name="endDate"
                type="Date"
                color="primary"
                class="mt-2 mx-2"
                variant="underlined"
                hide-details="auto"
              />
              <h4 class="my-5">Khoảng giá tour</h4>
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
              <h4 class="my-5">Sắp xếp theo giá</h4>
            </v-card-text>
          </v-form>
          <v-card-actions>
            <v-btn
              size="small"
              class="mx-2 rounded-xl text-none"
              variant="outlined"
              @click="() => resetSearch()"
            >
              Clear
            </v-btn>
            <v-spacer />
            <v-btn
              color="primary"
              size="small"
              class="mx-2 rounded-xl text-none"
              variant="outlined"
              prepend-icon="mdi-bed-double-outline"
              @click="() => {
                handleRoute({ name: 'tours' })
                titlePage = filtersHotels
                getHotelsByFilterPanel(filtersHotels)
              }"
            >
              Search
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="9" class="card-show">
        <v-card color="transparent" elevation="0" class="mb-5">
          <v-card-text>
            <h2 class="ma-2 title-card-show">
              <v-icon icon="mdi-home-city-outline" />
              Tất cả những hotel hot
              <span v-if="titlePage.cityId"> ở {{ getCityById(titlePage.cityId)?.name }}</span>
              <span v-if="titlePage.endDate"> từ ngày {{ formatDate(titlePage.startDate) }} đến {{ formatDate(titlePage.endDate) }}</span>
            </h2>
          </v-card-text>
        </v-card>
        <n-panel-loading :loading="loadingHotels" />
        <n-panel-not-found
          v-if="hotels?.results.length === 0 && !loadingHotels"
          icon="mdi-timer-sand-empty"
          title="Không có tour du lịch nào phù hợp!"
        />
        <v-container class="my-5">
          <v-row v-if="!loadingHotels">
            <v-col v-for="item in hotels?.results" :key="item?.id" cols="12">
              <v-card
                elevation="0"
                class="my-5 hotel-card rounded-xl"
                @click="() => handleRoute({ name: 'hotelDetail', params: { id: item?.id } })"
              >
                <v-row>
                  <v-col cols="4">
                    <n-image :src="item?.coverPicture" height="300" class="custom-image-hotel" />
                  </v-col>
                  <v-col cols="7">
                    <h2 class="mt-5 ml-2">
                      {{ item?.name }}
                    </h2>
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
                          <p
                            v-if="!_.isEmpty(item?.couponData)"
                            class="text-caption animate-charcter"
                          >
                            <v-icon icon="mdi-home-city-outline" class="animate-charcter" />
                            Ưu đãi khách sạn - {{ item?.couponData.discountPercent }}%
                          </p>
                          <p
                            v-if="!_.isEmpty(item?.couponData)"
                            class="remove-text"
                          >
                            {{ rangePrice(item?.minPrice, item?.maxPrice) }}
                          </p>
                          <h3 class="animate-charcter">
                            <v-icon
                              v-if="_.isEmpty(item?.couponData)"
                              icon="mdi-cash-fast"
                              class="animate-charcter"
                            />
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
            v-if="hotels?.results.length !== 0 && !loadingHotels"
            class="my-5"
            v-model="pageHotel"
            :length="hotels?.pageNumber"
            @change="() => getHotelsByFilterPanel({ page: pageHotel })"
          />
        </v-container>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script lang="ts" setup>
import NImage from '@/components/NImage.vue'
import NPanelLoading from '@/components/NPanelLoading.vue'
import NPagination from '@/components/NPagination.vue'
import NCitiesSelect from '@/components/NCitiesSelect.vue'
import NPanelNotFound from '@/components/NPanelNotFound.vue'
import _ from 'lodash'
import { onMounted } from 'vue'
import { convertionType } from '@/helpers/convertion'
import { handleRoute } from '@/helpers/loadingRoute'
import { useHotelUtil } from '@/composables/useHotel'
import { useCities } from '@/composables/useCities'

const {
  hotels,
  pageHotel,
  filtersHotels,
  loadingHotels,
  titlePage,
  getHotelsByFilterPanel,
  resetSearch
} = useHotelUtil()
const { rangePrice, voteText, minDate, formatDate } = convertionType()
const { getCityById } = useCities()
onMounted(() => {
  getHotelsByFilterPanel(filtersHotels.value)
})
</script>
<style lang="scss" scoped>
.hotels-page {
  background-image: url('@/assets/img/map-bg.png');
  background-size: contain;
  background-position: center center;
  .container_hotels {
    background-image: linear-gradient(to bottom, rgba(248, 230, 248, 0.2), rgba(235, 178, 244, 0.2)),
      url('@/assets/img/bg-hotel.jpeg');
    background-size: cover;
    height: 500px;
  }
  .custom-image-hotel {
    -webkit-mask-image: url("@/assets/img/card-bg.png");
    mask-image: url("@/assets/img/card-bg.png");
    -webkit-mask-size: cover;
    mask-size: cover;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
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
  .title-card-show {
    font-weight: 600;
  }
  @media screen and (max-width: 1100px) {
    .card-search {
      margin: 0 auto;
      width: 500px
    }
    .card-show {
      flex: 0 0 100% !important;
      max-width: 100% !important;
    }
  }
}
</style>