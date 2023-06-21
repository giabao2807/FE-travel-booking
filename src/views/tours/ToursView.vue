<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <v-sheet class="tours-page">
    <v-container fluid class="pa-0">
      <div class="container_tours">
        <v-row class="h-50 w-100" align="end" justify="center">
          <h1 class="heading-primary shadow-text">
            <span class="heading-primary--main">Travels Tours</span>
            <span class="heading-primary--sub" style="font-size: 20px;">Travel is the only thing you buy that makes you richer</span>
          </h1>
        </v-row>
      </div>
    </v-container>
    <v-container fluid>
      <v-row>
        <v-col class="px-0">
          <v-card elevation="3" class="card-search my-3 rounded-xl">
            <h3 class="text-center my-3">
              <v-icon icon="mdi-map-search-outline" />
              Search Tours
            </h3>
            <v-form ref="formSearchRef">
              <v-card-text>
                <h4 class="mb-2">Thông Tin Tour</h4>
                <v-text-field
                  v-model="filtersTours.name"
                  label="Name Tour"
                  color="primary"
                  density="compact"
                  prepend-inner-icon="mdi-compass-rose"
                  class="ma-2"
                  variant="outlined"
                  hide-details="auto"
                />
                <n-cities-select
                  v-model="filtersTours.cityId"
                  prependInnerIcon="mdi-map-marker-radius-outline"
                  class="ma-2"
                  :compact="true"
                  variant="outlined"
                />
                <v-text-field
                  v-model="filtersTours.startDate"
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
                  v-model="filtersTours.endDate"
                  :min="filtersTours.startDate"
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
                <h4 class="mt-5 mb-8">Khoảng Giá Tour</h4>
                <v-row>
                  <v-range-slider
                    v-model="priceRangeFilter"
                    :max="200000000"
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
                  v-model="filtersTours.sortBy"
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
                  prepend-icon="mdi-airplane-search"
                  @click="() => {
                    handleRoute({ name: 'tours' })
                    titlePage = filtersTours
                    getToursByFilterPanel(filtersTours)
                  }"
                >
                  Search
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
        <v-col cols="9" class="card-show px-0">
          <v-card elevation="0" class="card-title pb-0">
            <v-card-text>
              <h2 class="ma-2 title-card-show">
                <v-icon icon="mdi-compass-rose" />
                Tất cả những tour du lịch hấp dẫn
                <span v-if="titlePage?.cityId"> ở {{ getCityById(titlePage?.cityId)?.name }}</span>
                <span v-if="titlePage?.endDate"> từ ngày {{ titlePage?.startDate }} đến {{ titlePage?.endDate }}</span>
              </h2>
            </v-card-text>
          </v-card>
          <n-panel-loading :loading="loadingTours" />
          <n-panel-not-found
            v-if="tours?.results.length === 0 && !loadingTours"
            icon="mdi-timer-sand-empty"
            title="Không có tour du lịch nào phù hợp!"
          />
          <v-container fluid v-if="!loadingTours">
            <v-card
              v-for="item in tours?.results"
              :key="item?.id"
              elevation="0"
              color="transparent"
              class="ml-8 mb-12 tour-card rounded-xl"
            >
              <v-row>
                <v-col cols="5">
                  <n-image
                    :src="item?.coverPicture"
                    height="210"
                    class="custom-image-tour"
                  />
                </v-col>
                <v-col class="pa-0">
                  <div>
                    <h3 class="mt-5 ml-2 w-75">
                      {{ item?.name }}
                    </h3>
                    <v-icon
                      v-if="isSignIn"
                      style="position: absolute; top: 0; right: 0"
                      color="error"
                      size="large"
                      :icon="item?.isFavorite ? 'mdi-heart' : 'mdi-cards-heart-outline'"
                      :class="item?.isFavorite ? 'icon-fav-co ma-5' : 'ma-5'"
                      @click="async () => {
                        !item?.isFavorite ? await addFavoriteTour(item?.id || '') : await removeFavoriteTour(item?.id || '')
                        getToursByFilterPanel({ ...filtersTours, page: pageTours })
                      }"
                    />
                  </div>
                  <v-card-text class="mx-3">
                    <v-row align="start" class="my-3">
                      <v-icon icon="mdi-clock-start" />
                      Khởi hành:
                      <v-col cols="4" class="pa-0 ml-2">
                        <strong>{{ item?.departure }}</strong>
                      </v-col>
                    </v-row>
                    <v-row align="center" class="my-3">
                      <v-icon icon="mdi-map-clock-outline" />
                      Thời gian:
                      <strong class="mx-2">{{ item?.totalDays }}</strong>
                    </v-row>
                    <v-row align="center" class="my-3">
                      <v-icon icon="mdi-shoe-sneaker" />
                      Phương tiện:
                      <v-icon
                        v-for="traffic in getTraffic(item?.traffics)"
                        :key="traffic.value"
                        :icon="traffic?.icon"
                        class="mx-1"
                      />
                    </v-row>
                    <v-row align="center" class="my-3">
                      <v-icon icon="mdi-vote-outline" />
                      Rating:
                      <v-rating
                        :model-value="item?.rate"
                        class="mx-2"
                        color="amber"
                        density="compact"
                        half-increments
                        readonly
                        size="small"
                      />
                    </v-row>
                  </v-card-text>
                  <div class="card-actions">
                    <v-row>
                      <v-col>
                        <p v-if="!_.isEmpty(item?.couponData)" class="text-caption animate-charcter">
                          <v-icon icon="mdi-billboard" class="animate-charcter" />
                          Ưu đãi du lịch - {{ item?.couponData.discountPercent }}%
                        </p>
                        <p v-if="!_.isEmpty(item?.couponData)" class="remove-text">{{ formatCurrency(item?.price) }}</p>
                        <h2 class="animate-charcter">
                          <v-icon
                            v-if="_.isEmpty(item?.couponData)"
                            icon="mdi-cash-fast"
                            class="animate-charcter"
                          />
                          {{ formatCurrency(getPriceDiscount(item?.price, item?.couponData.discountPercent)) }}
                        </h2>
                      </v-col>
                    </v-row>
                    <v-row>
                      <n-dialog-book
                        v-model="item.dialog"
                        titleDialog="BOOK TOUR"
                        :tourInfo="item"
                      >
                        <template #action>
                          <v-btn
                            prepend-icon="mdi-checkbox-marked-circle-auto-outline"
                            class="mr-2 text-none rounded-s-xl"
                            color="primary"
                            variant="tonal"
                            @click="() => item.dialog = true"
                          >
                            Book Now
                          </v-btn>
                        </template>
                      </n-dialog-book>
                      <v-btn
                        color="primary"
                        variant="tonal"
                        prepend-icon="mdi-dots-vertical"
                        class="text-none rounded-e-xl"
                        @click="() => handleRoute({ name: 'tourDetail', params: { id: item?.id } })"
                      >
                        More...
                      </v-btn>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-container>
          <n-pagination
            v-if="tours?.results && !loadingTours"
            class="my-5"
            v-model="pageTours"
            :length="tours?.pageNumber"
            @update:model-value="getToursByFilterPanel({ ...filtersTours, page: pageTours })"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
<script lang="ts" setup>
import NImage from '@/components/NImage.vue'
import NPanelLoading from '@/components/NPanelLoading.vue'
import NPagination from '@/components/NPagination.vue'
import NCitiesSelect from '@/components/NCitiesSelect.vue'
import NDialogBook from '@/components/NDialogBook.vue'
import NPanelNotFound from '@/components/NPanelNotFound.vue'
import { onMounted } from 'vue'
import _ from 'lodash'
import { useTourUtil } from '@/composables/useTour'
import { convertionType } from '@/helpers/convertion'
import { handleRoute } from '@/helpers/loadingRoute'
import { useCities } from '@/composables/useCities'
import { checkInfo } from '@/helpers/checkSignIn'

const { getCityById } = useCities()
const {
  tours,
  pageTours,
  loadingTours,
  filtersTours,
  titlePage,
  priceRangeFilter,
  formSearchRef,
  getToursByFilterPanel,
  resetSearch,
  addFavoriteTour,
  removeFavoriteTour
} = useTourUtil()
const { formatCurrency, getPriceDiscount, minDate, getTraffic } = convertionType()
const { isSignIn } = checkInfo()
onMounted(() => {
  getToursByFilterPanel(filtersTours.value)
})
</script>
<style lang="scss" scoped>
@import url('@/assets/scss/tours/index.scss');
</style>