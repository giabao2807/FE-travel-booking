<template>
  <v-sheet class="container-detail">
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
            <template #default>
              <v-row
                class="fill-height ma-0"
                align="start"
                justify="center"
              >
                <h1 class="heading-primary text-custom-shadow">
                  <span class="heading-primary--main">{{ tourInfo?.name }}</span>
                </h1>
              </v-row>
            </template>
          </v-carousel-item>
        </v-carousel>
      </v-sheet>
    </v-sheet>
    <v-sheet class="mx-5 rooms-detail">
      <div v-html="tourInfo?.descriptions" />
      <div v-html="tourInfo?.note" />
      <div v-html="tourInfo?.scheduleContent" />
    </v-sheet>
  </v-sheet>
</template>
<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTourUtil } from '@/composables/useTour'

const route = useRoute()
const tourId = route.params.id as string
const { tourInfo, getTourById } = useTourUtil()
const minDate = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today.toISOString().split('T')[0]
})
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
  z-index: 9999;
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