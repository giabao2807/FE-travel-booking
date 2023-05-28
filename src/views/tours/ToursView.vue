<template>
  <v-sheet class="tours-page">
    <v-container fluid class="pa-0">
      <div class="container_tours">
        <v-row class="h-50 w-100" align="end" justify="center">
          <h1 class="heading-primary">
            <span class="heading-primary--main">Travels Tours</span>
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
          <h3 class="text-center">Search Tours</h3>
          <v-card-text>
            <h4>Thông tin đặt tours</h4>
            <n-cities-select v-model="initFilterTour.cityId" class="mx-2 mb-5" />
            <v-row class="mx-2" align="center">
              <v-col cols="3">
                <p class="text-h7 text-disabled font-rowdies">
                  {{ countDate }}
                  <v-icon class="mt-n2" icon="mdi-weather-night" />
                </p>
              </v-col>
              <v-col class="px-0">
                <v-text-field
                  v-model="initFilterTour.startDate"
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
                  v-model="initFilterTour.endDate"
                  :min="initFilterTour.startDate"
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
            <v-row justify="center">
              <v-btn class="mx-2">
                Clear
              </v-btn>
              <v-btn
                class="mx-2"
                @click="() => getToursByFilterPanel()"
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
              Những tour du lịch
              <span v-if="initFilterTour?.cityId"> ở {{ getCityById(initFilterTour?.cityId)?.name }}</span>
              <span v-if="initFilterTour?.endDate"> từ ngày {{ initFilterTour?.startDate }} đến {{ initFilterTour?.endDate }}</span>
            </h3>
          </v-card-text>
        </v-card>
        <n-panel-loading :loading="loadingTours" />
        <v-row v-if="!loadingTours">
          <v-col v-for="item in tours?.results" :key="item?.id" cols="12">
            <v-card
              elevation="0"
              class="ml-5 my-5 tour-card"
              color="transparent"
            >
              <v-row>
                <v-col cols="4">
                  <n-image :src="item?.coverPicture" height="300" />
                </v-col>
                <v-col>
                  <h2 class="mt-5 mx-2">
                    {{ item?.name }}
                  </h2>
                  <v-card-text class="mx-3">
                    <v-row align="center" class="my-3">
                      <v-icon icon="mdi-clock-start" />
                      Khởi hành:
                      <strong class="mx-2">{{ item?.departure }}</strong>
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
                        <p v-if="item?.couponData" class="text-caption animate-charcter">
                          <v-icon icon="mdi-billboard" class="animate-charcter" />
                          Ưu đãi du lịch - {{ item?.couponData.discountPercent }}%
                        </p>
                        <p v-if="item?.couponData" class="remove-text">{{ formatCurrency(item?.price) }}</p>
                        <h2 class="animate-charcter">
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
                            class="mr-2"
                            color="primary"
                            variant="tonal"
                            @click="() => item.dialog = true"
                          >
                            Book now
                          </v-btn>
                        </template>
                      </n-dialog-book>
                      <v-btn
                        color="primary"
                        variant="tonal"
                        class="text-none"
                        @click="() => hanldeRoute({ name: 'tourDetail', params: { id: item?.id } })"
                      >
                        More...
                      </v-btn>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <n-pagination
          v-if="tours?.results"
          class="my-5"
          v-model="pageTours"
          :length="tours?.pageNumber"
          @change="getToursByFilterPanel({ page: pageTours })"
        />
      </v-main>
    </v-layout>
  </v-sheet>
</template>
<script lang="ts" setup>
import NImage from '@/components/NImage.vue'
import NPanelLoading from '@/components/NPanelLoading.vue'
import NPagination from '@/components/NPagination.vue'
import NCitiesSelect from '@/components/NCitiesSelect.vue'
import NDialogBook from '@/components/NDialogBook.vue'
import { onMounted } from 'vue'
import { useTourUtil } from '@/composables/useTour'
import { useCities } from '@/composables/useCities'
import { convertionType } from '@/helpers/convertion'
import { hanldeRoute } from '@/helpers/loadingRoute'

const {
  tours,
  pageTours,
  loadingTours,
  initFilterTour,
  countDate,
  getToursByFilterPanel
} = useTourUtil()
const { formatCurrency, getPriceDiscount, minDate, getTraffic } = convertionType()
const { getCityById } = useCities()
onMounted(() => {
  getToursByFilterPanel()
})
</script>
<style lang="scss" scoped>
.tours-page {
  .container_tours {
    background-image: linear-gradient(to bottom, rgba(248, 230, 248, 0.2),rgba(235, 178, 244, 0.2)),
    url('@/assets/img/bg-test.jpeg');
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
  .tour-card {
    width: 85%;
    cursor: pointer;
    transition: all 0.6s cubic-bezier(0.680, -0.550, 0.265, 1.550);
  }
  .tour-card:hover {
    transform: translateY(-1.3rem) scale(1.05);
  }
}
</style>