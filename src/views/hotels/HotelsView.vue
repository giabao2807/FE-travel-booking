<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <v-sheet class="hotels-page">
    <v-container fluid class="pa-0">
      <div class="container_hotels">
        <v-row class="h-50 w-100" align="end" justify="center">
          <h1 class="heading-primary shadow-text">
            <span class="heading-primary--main">Hotels</span>
            <span class="heading-primary--sub" style="font-size: 20px;">Come, stay and enjoy your day</span>
          </h1>
        </v-row>
      </div>
    </v-container>
    <v-row>
      <v-col class="px-0">
        <v-card elevation="3" class="card-search my-3 rounded-xl">
          <h3 class="text-center my-3">
            <v-icon icon="mdi-map-search-outline" />
            Search Hotels
          </h3>
          <v-form ref="formSearchRef">
            <v-card-text>
              <h4 class="mb-2">Thông Tin Hotel</h4>
              <v-text-field
                v-model="filtersHotels.name"
                label="Name Hotel"
                color="primary"
                density="compact"
                prepend-inner-icon="mdi-home-variant-outline"
                class="ma-2"
                variant="outlined"
                hide-details="auto"
              />
              <n-cities-select
                v-model="filtersHotels.cityId"
                prependInnerIcon="mdi-map-marker-radius-outline"
                class="ma-2"
                :compact="true"
                variant="outlined"
              />
              <v-text-field
                v-model="filtersHotels.startDate"
                :min="minDate(new Date())"
                label="Start Date"
                name="startDate"
                type="Date"
                prepend-inner-icon="mdi-calendar-export-outline"
                color="primary"
                density="compact"
                class="ma-2"
                variant="outlined"
                hide-details="auto"
              />
              <v-text-field
                v-model="filtersHotels.endDate"
                :min="filtersHotels.startDate"
                label="End Date"
                name="endDate"
                type="Date"
                prepend-inner-icon="mdi-calendar-import-outline"
                density="compact"
                color="primary"
                class="ma-2"
                variant="outlined"
                hide-details="auto"
              />
              <h4 class="mt-5 mb-8">Khoảng Giá Hotel</h4>
              <v-row>
                <v-range-slider
                  v-model="priceRangeFilter"
                  :max="100000000"
                  :min="0"
                  :step="1"
                  hide-details
                  density="compact"
                  color="primary"
                  class="mx-8 mt-5"
                  thumb-label="always"
                >
                  <template #thumb-label="{ modelValue }">
                    <span>{{ formatCurrency(modelValue) }}</span>
                  </template>
                </v-range-slider>
              </v-row>
              <h4 class="mt-5 mb-2">Sắp Xếp Theo Giá</h4>
              <v-select
                v-model="filtersHotels.sortBy"
                prepend-inner-icon="mdi-sort-alphabetical-variant"
                label="Order By"
                density="compact"
                color="primary"
                :items="[{
                  name: 'Tăng dần',
                  value: 'asc'
                }, {
                  name: 'Giảm dần',
                  value: 'desc'
                }]"
                item-title="name"
                item-value="value"
                variant="outlined"
                hide-details="auto"
              />
            </v-card-text>
            <v-divider class="mx-10" />
            <v-card-actions class="ma-2">
              <v-btn
                size="small"
                class="mx-2 rounded-xl text-none"
                prepend-icon="mdi-broom"
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
                  handleRoute({ name: 'hotels' })
                  titlePage = filtersHotels
                  getHotelsByFilterPanel(filtersHotels)
                }"
              >
                Search
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="9" class="card-show px-0">
        <v-card color="transparent" elevation="0">
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
          title="Không có Hotel du lịch nào phù hợp!"
        />
        <v-container fluid v-if="!loadingHotels">
          <v-card
            v-for="item in hotels?.results"
            :key="item?.id"
            elevation="0"
            color="transparent"
            class="ml-8 mb-12 hotel-card rounded-xl"
            @click="() => handleRoute({ name: 'hotelDetail', params: { id: item?.id } })"
          >
            <v-row>
              <v-col cols="4">
                <n-image
                  :src="item?.coverPicture"
                  height="250"
                  class="custom-image-hotel"
                />
              </v-col>
              <v-col cols="7">
                <h2 class="mt-5 ml-2">
                  {{ item?.name }}
                </h2>
                <v-icon
                  v-if="isSignIn"
                  style="position: absolute; top: 0; right: 0"
                  color="error"
                  size="large"
                  :icon="item?.isFavorite ? 'mdi-heart' : 'mdi-cards-heart-outline'"
                  :class="item?.isFavorite ? 'icon-fav-co ma-5' : 'ma-5'"
                  @click="async () => {
                    item?.isFavorite ? await addFavoriteHotel(item?.id || '') : await removeFavoriteHotel(item?.id || '')
                    getHotelsByFilterPanel({ ...filtersHotels, page: pageHotel })
                  }"
                />
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
                      class="text-none rounded-xl"
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
          <n-pagination
            v-if="hotels?.results.length !== 0 && !loadingHotels"
            class="my-5"
            v-model="pageHotel"
            :length="hotels?.pageNumber"
            @change="() => getHotelsByFilterPanel({ ...filtersHotels, page: pageHotel })"
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
import { checkInfo } from '@/helpers/checkSignIn'

const {
  hotels,
  pageHotel,
  filtersHotels,
  loadingHotels,
  titlePage,
  priceRangeFilter,
  getHotelsByFilterPanel,
  resetSearch,
  addFavoriteHotel,
  removeFavoriteHotel
} = useHotelUtil()
const { rangePrice, voteText, minDate, formatDate, formatCurrency } = convertionType()
const { getCityById } = useCities()
const { isSignIn } = checkInfo()
onMounted(() => {
  getHotelsByFilterPanel(filtersHotels.value)
})
</script>
<style lang="scss" scoped>
@import url('@/assets/scss/hotels/index.scss');
</style>