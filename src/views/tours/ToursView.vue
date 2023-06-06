<template>
  <v-sheet class="tours-page">
    <v-container fluid class="pa-0">
      <div class="container_tours">
        <v-row class="h-50 w-100" align="end" justify="center">
          <h1 class="heading-primary shadow-text">
            <span class="heading-primary--main">Travels Tours</span>
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
            Search Tours
          </h3>
          <v-form ref="formSearchRef">
            <v-card-text>
              <h4 class="mb-2">Thông tin đặt</h4>
              <n-cities-select v-model="filtersTours.cityId" class="mx-2" />
              <v-text-field
                v-model="filtersTours.startDate"
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
                v-model="filtersTours.endDate"
                :min="filtersTours.startDate"
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
            <v-card-actions>
              <v-btn
                size="small"
                class="mx-2 rounded-xl"
                variant="outlined"
                @click="() => resetSearch()"
              >
                Clear
              </v-btn>
              <v-spacer />
              <v-btn
                color="primary"
                size="small"
                class="mx-2 rounded-xl"
                variant="outlined"
                prepend-icon="mdi-airplane-search"
                @click="() => {
                  handleRoute({ name: 'tours' })
                  getToursByFilterPanel(filtersTours)
                }"
              >
                Search
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="9" class="card-show">
        <v-card elevation="0" class="mb-5 card-title">
          <v-card-text>
            <h2 class="ma-2 title-card-show">
              <v-icon icon="mdi-compass-rose" />
              Tất cả những tour du lịch hấp dẫn
              <span v-if="titlePage.cityId"> ở {{ getCityById(titlePage.cityId)?.name }}</span>
              <span v-if="titlePage.endDate"> từ ngày {{ titlePage.startDate }} đến {{ titlePage.endDate }}</span>
            </h2>
          </v-card-text>
        </v-card>
        <n-panel-loading :loading="loadingTours" />
        <n-panel-not-found
          v-if="tours?.results.length === 0 && !loadingTours"
          icon="mdi-timer-sand-empty"
          title="Không có tour du lịch nào phù hợp!"
        />
        <v-row v-if="!loadingTours">
          <v-col v-for="item in tours?.results" :key="item?.id" cols="12">
            <v-card
              elevation="0"
              class="ml-5 my-5 tour-card rounded-xl"
            >
              <v-row>
                <v-col cols="5">
                  <n-image :src="item?.coverPicture" height="220" class="custom-image-tour" />
                </v-col>
                <v-col class="pa-0">
                  <h3 class="mt-5 mx-2">
                    {{ item?.name }}
                  </h3>
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
                        @click="() => handleRoute({ name: 'tourDetail', params: { id: item?.id } })"
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
          v-if="tours?.results && !loadingTours"
          class="my-5"
          v-model="pageTours"
          :length="tours?.pageNumber"
          @update:model-value="getToursByFilterPanel({ page: pageTours })"
        />
      </v-col>
    </v-row>
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

const { getCityById } = useCities()
const {
  tours,
  pageTours,
  loadingTours,
  filtersTours,
  titlePage,
  getToursByFilterPanel,
  formSearchRef,
  resetSearch
} = useTourUtil()
const { formatCurrency, getPriceDiscount, minDate, getTraffic } = convertionType()

onMounted(() => {
  getToursByFilterPanel(filtersTours.value)
})
</script>
<style lang="scss" scoped>
.tours-page {
  background-image: url('@/assets/img/map-bg.png');
  background-size: contain;
  background-position: center center;
  .container_tours {
    background-image: linear-gradient(to bottom, rgba(248, 230, 248, 0.2),rgba(235, 178, 244, 0.2)),
    url('@/assets/img/panel-hotel.jpg');
    background-size: cover;
    height: 500px;
  }
  .custom-image-tour {
    margin-top: 20px;
    -webkit-mask-image: url("@/assets/img/image-card.png");
    mask-image: url("@/assets/img/image-card.png");
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
  .tour-card {
    width: 88%;
    cursor: pointer;
    transition: all 0.6s cubic-bezier(0.680, -0.550, 0.265, 1.550);
  }
  .tour-card:hover {
    transform: translateY(-1.2rem) scale(1.03);
  }
  .card-title {
    background-color: transparent;
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