<template>
  <v-sheet>
    <v-row class="py-5" justify="space-between">
      <v-col cols="8" class="mx-5">
        <h1>
          {{ tourInfo?.name }}
        </h1>
        <v-sheet>
          <v-sheet>
            <v-carousel
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
          </v-sheet>
        </v-sheet>
        <v-container class="mx-5">
          <div v-html="tourInfo?.descriptions" />
          <div v-html="tourInfo?.note" />
          <div v-html="tourInfo?.scheduleContent" />
        </v-container>
      </v-col>
      <v-col class="mt-n5">
        <v-card
          class="mx-5 my-12"
          max-width="374"
          style="position: fixed;"
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
            <v-card-title>Booking in here</v-card-title>

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
            <v-row
              align="center"
              class="mx-0"
            >
              <v-rating
                :model-value="4.5"
                color="amber"
                density="compact"
                half-increments
                readonly
                size="small"
              />

              <div class="text-grey ms-4">
                4.5 (413)
              </div>
            </v-row>

            <div class="my-4 text-subtitle-1">
              $ • Italian, Cafe
            </div>

            <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
          </v-card-text>

          <v-divider class="mx-4 mb-1" />

          <v-card-title>Tonight's availability</v-card-title>

          <v-card-actions>
            <v-btn
              color="deep-purple-lighten-2"
              variant="text"
            >
              Reserve
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
const { tourInfo, getTourById } = useTourUtil()
onMounted(async() => {
  await getTourById(tourId)
})
</script>

<style scoped>
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

</style>