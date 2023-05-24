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
        floating
        permanent
      >
        <v-list
          density="compact"
          nav
        >
          <v-list-item class="mx-auto">
            <v-card>
              <h3>Search Panel</h3>
            </v-card>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main class="my-5">
        <n-panel-loading :loading="loadingTours" />
        <v-row v-if="!loadingTours">
          <v-col v-for="item in tours?.results" :key="item?.id" cols="12">
            <v-card
              elevation="0"
              class="ml-10 my-5 tour-card"
              color="transparent"
              @click="() => hanldeRoute({ name: 'tourDetail', params: { id: item?.id } })"
            >
              <v-row>
                <v-col cols="4">
                  <n-image :src="item?.coverPicture" height="300" />
                </v-col>
                <v-col>
                  <h2 class="mt-5 ml-2">
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
                        <p class="text-caption animate-charcter">
                          <v-icon icon="mdi-billboard" class="animate-charcter" />
                          Ưu đãi du lịch - {{ item?.couponData.discountPercent }}%
                        </p>
                        <p class="remove-text">{{ formatCurrency(item?.price) }}</p>
                        <h2 class="animate-charcter">
                          {{ formatCurrency(getPriceDiscount(item?.price, item?.couponData.discountPercent)) }}
                        </h2>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-btn
                        prepend-icon="mdi-cart-variant"
                        color="primary"
                        variant="tonal"
                      >
                        Cart
                      </v-btn>
                      <v-btn
                        prepend-icon="mdi-checkbox-marked-circle-auto-outline"
                        class="ml-2"
                        color="primary"
                        variant="tonal"
                      >
                        Book now
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
          :page="pageTours"
          :length="tours?.pageNumber"
          @changePage="() => getToursByFilterPanel({ page: pageTours })"
        />
      </v-main>
    </v-layout>
  </v-sheet>
</template>
<script lang="ts" setup>
import NImage from '@/components/NImage.vue'
import NPanelLoading from '@/components/NPanelLoading.vue'
import NPagination from '@/components/NPagination.vue'
import { useTourUtil } from '@/composables/useTour'
import { onMounted } from 'vue'
import { convertionType } from '@/helpers/convertion'
import { hanldeRoute } from '@/helpers/loadingRoute'

const { tours, pageTours, loadingTours, getTraffic, getToursByFilterPanel } = useTourUtil()
const { formatCurrency, getPriceDiscount } = convertionType()
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
    width: 90%;
    cursor: pointer;
    transition: all 0.6s cubic-bezier(0.680, -0.550, 0.265, 1.550);
  }
  .tour-card:hover {
    transform: translateY(-1.3rem) scale(1.05);
  }
}
</style>