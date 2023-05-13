<template>
  <v-sheet class="container-detail">
    <v-sheet>
      <v-sheet>
        <n-image :src="hotel?.coverPicture" cover height="500" aspect-ratio="16/9">
          <template #default>
            <v-row
              class="fill-height ma-0"
              align="start"
              justify="center"
            >
              <h1 class="heading-primary text-custom-shadow">
                <span class="heading-primary--main">{{ hotel?.name }}</span>
              </h1>
            </v-row>
          </template>
        </n-image>
      </v-sheet>
      <v-card
        elevation="10"
        class="toolbar"
      >
        <v-card-text>
          <div class="d-flex align-center flex-wrap ma-5">
            <v-text-field
              label="Ngày nhận phòng"
              name="startDate"
              prepend-icon="mdi-clipboard-text-clock-outline"
              type="Date"
              :min="minDate"
              color="primary"
              hide-details="auto"
              class="text-field"
              variant="outlined"
            />
            <v-text-field
              label="Ngày trả phòng"
              name="endDate"
              type="Date"
              color="primary"
              prepend-icon="mdi-fast-forward-outline"
              variant="outlined"
              hide-details="auto"
              class="text-field"
            />
            <v-btn
              class="text-none mx-5 btn-shadown"
              size="40"
              color="#8a0642"
              min-width="110"
              rounded
              variant="flat"
            >
              Tìm Kiếm
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-sheet>
    <v-sheet class="mx-5 description">
      <v-row
        class="mx-5"
        v-for="room in rooms"
        :key="room?.id"
      >
        <v-col col="12">
          <v-card class="card-detail" height="300">
            <div class="d-flex flex-no-wrap justify-between">
              <v-carousel
                class="carousel"
                height="300"
                cycle
                show-arrows="hover"
                hide-delimiters
                hide-delimiter-background
              >
                <v-carousel-item
                  v-for="(item, i) in hotel?.listImages"
                  :key="i"
                  :src="item"
                  cover
                />
                <template #placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="red"
                    />
                  </v-row>
                </template>
              </v-carousel>
              <div>
                <v-card-title class="text-h5">
                  {{ room?.name }}
                </v-card-title>
                <v-card-subtitle v-html="room?.description" />
                <v-card-actions>
                  <v-btn
                    class="ms-2"
                    variant="outlined"
                    size="small"
                  >
                    Booking Now
                  </v-btn>
                </v-card-actions>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
    <v-sheet color="transparent" class="mx-5 description">
      <v-container>
        <v-row>
          <v-col cols="4">
            <div class="position-relative">
              <n-image :src="hotel?.coverPicture" height="600" class="composition__photo" />
            </div>
          </v-col>
          <v-col cols="8">
            <v-card class="card-decs-detail">
              <v-card-text class="ma-5" style="position: relative; height: 80%;">
                <v-expansion-panels
                  class="position-absolute" style="z-index: 2; top: 0; left: 0;"
                >
                  <v-expansion-panel>
                    <v-expansion-panel-title>
                      <v-banner lines="three" :stacked="false">
                        <v-banner-text>
                          <div v-html="hotel?.descriptions" />
                        </v-banner-text>
                      </v-banner>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <v-lazy
                        class="overflow-y-auto"
                        :height="260"
                        :options="{ 'threshold':0.5 }"
                        transition="fade-transition"
                      >
                        <div v-html="hotel?.descriptions" />
                      </v-lazy>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
                <div class="d-flex mt-5 group-image">
                  <n-image height="250" :src="hotel?.coverPicture" />
                  <n-image height="250" class="ml-2" :src="hotel?.coverPicture" />
                  <n-image height="250" class="ml-2" :src="hotel?.coverPicture" />
                </div>
              </v-card-text>
              <v-card-actions>
                <a href="" class="btn btn-primary">Book Now</a>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <div v-html="hotel?.rules" />
    </v-sheet>
  </v-sheet>
</template>
<script lang="ts" setup>
import NImage from '@/components/NImage.vue'
import { useHotelUtil } from '@/composables/useHotel'
import { convertionType } from '@/helpers/convertion'
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const hotelId = route.params.id as string
const { hotel, rooms, getHotelById } = useHotelUtil()
const { deCodeHtml } = convertionType()
const minDate = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today.toISOString().split('T')[0]
})
onMounted(() => {
  getHotelById(hotelId)
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

.container-detail .toolbar {
  width: 60%;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}
.container-detail .description {
  margin-top: 8rem;
}
.container-detail .card-detail {
	border-radius: 5px;
}
.container-detail .carousel {
  width: 30%;
  position: relative;
  background-color: red;
  border: 1px solid var(--loading-bgcolor);
}
.container-detail .card-decs-detail {
  width: 60%;
  height: 500px;
  position: absolute;
  margin-left: -150px;
  margin-top: 60px;
}
.container-detail .text-field {
  width: 200px;

}
.container-detail .btn-shadown {
  color: #fff;
  font-weight: 600;
}
.container-detail .btn-shadown:hover {
  box-shadow: #ec488c 0px 0px 0px 6px;
}
.container-detail .group-image {
  position: relative;
  top: 35%;
  z-index: 1;
}
.composition__photo:hover {
  border-radius: 2px;
  outline-offset: 0.5rem;
  outline: 1rem solid var(--color-boni-like);
  box-shadow: 0 2.5rem 4rem rgba(0, 0, 0, 0.5);
}
::v-deep .htdt-policy,::v-deep .htdt-description {
  background-color: transparent !important;
}
</style>