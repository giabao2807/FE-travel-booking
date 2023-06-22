<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <v-sheet min-height="600" class="booking-page">
    <h2 class="text-center pt-10 pb-5">
      Yours Favorite History
    </h2>
    <v-tabs color="primary" align-tabs="center" v-model="tabWindow">
      <v-tab :value="1">
        <v-icon class="mr-5" icon="mdi-compass-rose" />
        Tours
      </v-tab>
      <v-tab :value="2">
        <v-icon class="mr-5" icon="mdi-bed-outline" />
        Hotels
      </v-tab>
    </v-tabs>
    <v-window v-model="tabWindow">
      <v-window-item :value="1">
        <n-panel-not-found
          v-if="!historyFavoriteTours.results && !loadingTours"
          icon="mdi-timer-sand-empty"
          title="Bạn chưa thích tour du lịch nào!"
        />
        <v-container>
          <n-panel-loading :loading="loadingTours" />
          <v-row v-if="!loadingTours" class="my-5">
            <v-col v-for="item in historyFavoriteTours.results" :key="item?.tour?.id" cols="12">
              <v-card elevation="0" class="my-2">
                <v-row>
                  <v-col>
                    <n-image :src="item?.tour?.coverPicture" class="custom-image" />
                  </v-col>
                  <v-col cols="9">
                    <div>
                      <h3 class="mt-5 ml-2 w-75">
                        {{ item.tour?.name }}
                      </h3>
                      <v-icon
                        style="position: absolute; top: 0; right: 0"
                        color="error"
                        size="large"
                        icon="mdi-close-outline"
                        class="composition-icon ma-5"
                        @click="async () => {
                          await removeFavoriteTour(item.tour?.id || '')
                          getHistoryFavoriteTours(pageTour)
                        }"
                      />
                    </div>
                    <v-card-text class="mx-3">
                      <v-row align="start" class="my-3">
                        <v-icon icon="mdi-clock-start" />
                        Khởi hành:
                        <v-col cols="4" class="pa-0 ml-2">
                          <strong>{{ item.tour?.departure }}</strong>
                        </v-col>
                      </v-row>
                      <v-row align="center" class="my-3">
                        <v-icon icon="mdi-map-clock-outline" />
                        Thời gian:
                        <strong class="mx-2">{{ item.tour?.totalDays }}</strong>
                      </v-row>
                      <v-row align="center" class="my-3">
                        <v-icon icon="mdi-shoe-sneaker" />
                        Phương tiện:
                        <v-icon
                          v-for="traffic in getTraffic(item.tour?.traffics)"
                          :key="traffic.value"
                          :icon="traffic?.icon"
                          class="mx-1"
                        />
                      </v-row>
                      <v-row align="center" class="my-3">
                        <v-icon icon="mdi-vote-outline" />
                        Rating:
                        <v-rating
                          :model-value="item?.tour?.rate"
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
                          <p v-if="!_.isEmpty(item.tour?.couponData)" class="text-caption animate-charcter">
                            <v-icon icon="mdi-billboard" class="animate-charcter" />
                            Ưu đãi du lịch - {{ item.tour?.couponData.discountPercent }}%
                          </p>
                          <p v-if="!_.isEmpty(item.tour?.couponData)" class="remove-text">{{ formatCurrency(item.tour?.price) }}</p>
                          <h2 class="animate-charcter">
                            <v-icon
                              v-if="_.isEmpty(item.tour?.couponData)"
                              icon="mdi-cash-fast"
                              class="animate-charcter"
                            />
                            {{ formatCurrency(getPriceDiscount(item.tour?.price, item.tour?.couponData.discountPercent)) }}
                          </h2>
                        </v-col>
                      </v-row>
                      <v-row justify="end">
                        <v-btn
                          class="text-none rounded-xl"
                          prepend-icon="mdi-dots-vertical"
                          color="primary"
                          variant="tonal"
                          @click="() => handleRoute({ name: 'tourDetail', params: { id: item.tour?.id } })"
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
            v-if="historyFavoriteTours?.results"
            class="my-5"
            v-model="pageTour"
            :length="historyFavoriteTours?.pageNumber"
            @change="() => getHistoryFavoriteTours(pageTour)"
          />
        </v-container>
      </v-window-item>
      <v-window-item :value="2">
        <n-panel-not-found
          v-if="!historyFavoriteHotels.results && !loadingHotels"
          icon="mdi-timer-sand-empty"
          title="Bạn chưa thích hotel nào!"
        />
        <v-container>
          <n-panel-loading :loading="loadingHotels" />
          <v-row v-if="!loadingHotels" class="my-5">
            <n-panel-loading :loading="loadingHotels" />
            <v-col v-for="item in historyFavoriteHotels.results" :key="item?.hotel?.id" cols="12">
              <v-card elevation="0" class="my-2">
                <v-row>
                  <v-col>
                    <n-image :src="item?.hotel?.coverPicture" class="custom-image" />
                  </v-col>
                  <v-col cols="9">
                    <div>
                      <h3 class="mt-5 ml-2 w-75">
                        {{ item.hotel?.name }}
                      </h3>
                      <v-icon
                        style="position: absolute; top: 0; right: 0"
                        color="error"
                        size="large"
                        icon="mdi-close-outline"
                        class="composition-icon ma-5"
                        @click="async() => {
                          await removeFavoriteHotel(item.hotel?.id || '')
                          getHistoryFavoriteHotels(pageHotel)
                        }"
                      />
                    </div>
                    <v-card-text class="mx-3 mt-n1">
                      <v-row align="center" class="my-3">
                        <v-icon :icon="voteText(item.hotel?.rateAverage).icon" color="primary" class="mr-1" />
                        <strong class="font-size-min-rem">{{ voteText(item.hotel?.rateAverage).name }}</strong>
                        <v-rating
                          :model-value="item?.hotel?.rateAverage"
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
                          {{ item.hotel?.numReview }}
                        </v-chip>
                      </v-row>
                      <v-row class="my-3">
                        <v-icon color="primary" icon="mdi-map-marker-radius-outline" />
                        <strong class="font-size-min-rem">Địa chỉ:</strong>
                        <v-col class="pa-0 ml-5" cols="5">
                          {{ item.hotel?.address }}
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <div class="card-actions">
                      <v-row>
                        <v-col>
                          <p
                            v-if="!_.isEmpty(item.hotel?.couponData)"
                            class="text-caption animate-charcter"
                          >
                            <v-icon icon="mdi-home-city-outline" class="animate-charcter" />
                            Ưu đãi khách sạn - {{ item.hotel?.couponData?.discountPercent }}%
                          </p>
                          <p
                            v-if="!_.isEmpty(item.hotel?.couponData)"
                            class="remove-text"
                          >
                            {{ rangePrice(item.hotel?.minPrice, item.hotel?.maxPrice) }}
                          </p>
                          <h3 class="animate-charcter">
                            <v-icon
                              v-if="_.isEmpty(item.hotel?.couponData)"
                              icon="mdi-cash-fast"
                              class="animate-charcter"
                            />
                            {{ rangePrice(item.hotel?.minPrice, item.hotel?.maxPrice, item.hotel?.couponData?.discountPercent) }}
                          </h3>
                        </v-col>
                      </v-row>
                      <v-row justify="end">
                        <v-btn
                          class="text-none rounded-xl"
                          prepend-icon="mdi-dots-vertical"
                          color="primary"
                          variant="tonal"
                          @click="() => handleRoute({ name: 'hotelDetail', params: { id: item.hotel?.id } })"
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
            v-if="historyFavoriteHotels?.results"
            v-model="pageHotel"
            class="my-5"
            :length="historyFavoriteHotels?.pageNumber"
            @change="() => getHistoryFavoriteHotels(pageHotel)"
          />
        </v-container>
      </v-window-item>
    </v-window>
  </v-sheet>
</template>
<script lang="ts" setup>
import NImage from '@/components/NImage.vue'
import NPagination from '@/components/NPagination.vue'
import NPanelLoading from '@/components/NPanelLoading.vue'
import NPanelNotFound from '@/components/NPanelNotFound.vue'
import { ref, onMounted } from 'vue'
import _ from 'lodash'
import { convertionType } from '@/helpers/convertion'
import { handleRoute } from '@/helpers/loadingRoute'
import { useFavorite } from '@/composables/useFavorite'
import { useTourUtil } from '@/composables/useTour'
import { useHotelUtil } from '@/composables/useHotel'

const {
  pageTour,
  pageHotel,
  loadingTours,
  loadingHotels,
  historyFavoriteTours,
  historyFavoriteHotels,
  getHistoryFavoriteTours,
  getHistoryFavoriteHotels
} = useFavorite()
const { removeFavoriteTour } = useTourUtil()
const { removeFavoriteHotel } = useHotelUtil()
const { formatCurrency, rangePrice, getPriceDiscount, voteText, getTraffic } = convertionType()
const tabWindow = ref<number>(1)
onMounted(() => {
  getHistoryFavoriteTours()
  getHistoryFavoriteHotels()
})
</script>
<style lang="scss" scoped>
.booking-page {
  background-image: url('@/assets/img/bg-detail.png');
  background-size: contain;
  background-position: center center;
}

.custom-image {
  -webkit-mask-image: url("@/assets/img/card-bg.png");
  mask-image: url("@/assets/img/card-bg.png");
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  width: 270px;
  height: 270px
}
.card-actions {
  position: absolute;
  right: 0;
  bottom: 0;
  margin-right: 25px;
  margin-bottom: 25px;
}
.composition-icon {
  transition: all 0.6s cubic-bezier(0.680, -0.550, 0.265, 1.550);
}
.composition-icon:hover {
  transform: rotate(360deg);
}
</style>