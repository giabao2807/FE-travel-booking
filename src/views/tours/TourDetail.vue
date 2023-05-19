<template>
  <v-sheet class="pa-0 ma-0 tour-container">
    <v-row class="py-5" justify="center">
      <v-col cols="8" class="mx-5">
        <h1>
          {{ tourInfo?.name }}
        </h1>
        <v-sheet>
          <v-sheet>
            <v-carousel
              class="mt-5"
              cycle
              show-arrows="hover"
              hide-delimiters
              hide-delimiter-background
            >
              <v-carousel-item
                v-for="(item, i) in tourInfo?.listImages"
                :key="i"
                :src="item"
                cover
              >
                <template #placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="primary"
                    />
                  </v-row>
                </template>
              </v-carousel-item>
            </v-carousel>
            <v-toolbar class="pa-5">
              <div class="w-100 py-2">
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-clock-start" />
                    Khởi hành:
                    <strong class="mx-2">{{ tourInfo?.departure }}</strong>
                  </v-col>
                  <v-col>
                    <v-icon icon="mdi-map-marker-multiple-outline" />
                    Địa điểm:
                    <strong class="mx-2">{{ tourInfo?.city }}</strong>
                  </v-col>
                  <v-col>
                    <v-icon icon="mdi-map-clock-outline" />
                    Thời gian:
                    <strong class="mx-2">{{ tourInfo?.totalDays }}</strong>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-shoe-sneaker" />
                    Phương tiện:
                    <v-icon
                      v-for="item in getTraffic(tourInfo?.traffics)"
                      :key="item.value"
                      :icon="item?.icon"
                      class="mx-2"
                    />
                  </v-col>
                  <v-col>
                    <v-icon icon="mdi-translate-variant" />
                    Ngôn ngữ:
                    <strong class="mx-2">{{ tourInfo?.languageTour }}</strong>
                  </v-col>
                  <v-col>
                    <v-row
                      align="center"
                      class="ma-0"
                    >
                      <v-icon icon="mdi-vote-outline" />
                      Rating:
                      <v-rating
                        :model-value="tourInfo?.rate"
                        class="mx-2"
                        color="amber"
                        density="compact"
                        half-increments
                        readonly
                        size="small"
                      />
                      {{ tourInfo?.rate }}
                    </v-row>
                  </v-col>
                </v-row>
              </div>
            </v-toolbar>
          </v-sheet>
        </v-sheet>
        <v-container>
          <v-card color="transparent" class="mx-0 rounded-xl" elevation="2">
            <v-card-text>
              <div v-html="tourInfo?.descriptions" />
            </v-card-text>
          </v-card>
          <v-card color="transparent" class="my-5 rounded-xl" elevation="2">
            <v-card-text>
              <div v-html="tourInfo?.scheduleContent" />
            </v-card-text>
          </v-card>
          <v-card color="transparent" class="my-5 rounded-xl" elevation="2">
            <v-card-text>
              <div v-html="tourInfo?.note" />
            </v-card-text>
          </v-card>
        </v-container>
      </v-col>
      <v-col class="mt-n2 pa-0">
        <v-card
          elevation="5"
          class="mx-auto my-12 card-drawer"
          width="374"
        >
          <template #loader="{ isActive }">
            <v-progress-linear
              :active="isActive"
              color="deep-purple"
              height="4"
              indeterminate
            />
          </template>

          <v-card-item>
            <v-card-title class="font-weight-bold pa-3">
              <h2>Booking in here</h2>
            </v-card-title>

            <v-card-subtitle>
              <span class="me-1">Local Favorite</span>

              <v-icon
                color="error"
                icon="mdi-fire-circle"
                size="small"
              />
            </v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <v-text-field
              label="Ngày khởi hành"
              name="startDate"
              type="Date"
              color="primary"
              variant="outlined"
              hide-details="auto"
            />
            <v-card class="my-5 pa-5">
              <v-row>
                <v-col>
                  <h4>Số lượng:</h4>
                </v-col>
                <v-col>
                  <v-icon icon="mdi-minus-thick" class="mx-2" />
                  10
                  <v-icon icon="mdi-plus-thick" class="mx-2" />
                </v-col>
              </v-row>
            </v-card>
            <v-divider class="ma-5" />
            <h3>Tổng tiền: {{ tourInfo?.price }}</h3>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn variant="outlined">
              Booking
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTourUtil } from '@/composables/useTour'

const route = useRoute()
const tourId = route.params.id as string
const { tourInfo, getTraffic, getTourById } = useTourUtil()
onMounted(async() => {
  await getTourById(tourId)
})
</script>

<style lang="scss" scoped>
.tour-container {
  background-image: url('@/assets/img/map-bg.png');
  background-size:cover;
  width: 100%;

  .container-detail {
    position: relative;
    z-index: 1;
    background-image: url('@/assets/img/bg-detail.png');
    background-size: cover;
    height: 100%;
  }
  .toolbar {
    width: 60%;
    min-height: 12%;
    justify-content: center;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
  .carousel {
    border-bottom: 1px solid var(--loading-bgcolor);
  }
  .text-field {
    width: 30% !important;
  }
  .text-field:hover{
    border-radius: 8px;
    box-shadow: var(--txt-shadow-color) -8px 2px 0px 0px;
    border-collapse: collapse;
    opacity: 1;
  }
  .el-range-editor .is-active:hover {
      box-shadow: 0 0 0 1px #d32f2f inset;
  }
  @media screen and (min-width: 1300px) {
    .card-drawer {
      position: fixed !important;
      width: 380px
    }
  }


}
::v-deep {
  .single-box-excerpt, .content-tour-item {
    span {
      line-height: 1.8;
    }
    li {
      margin-left: 2rem !important;
    }
  }

}
</style>