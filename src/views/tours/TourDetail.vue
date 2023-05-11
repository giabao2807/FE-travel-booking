<template>
  <v-sheet class="container-detail">
    <v-carousel
      class="carousel"
      cycle
      show-arrows="hover"
      hide-delimiters
      hide-delimiter-background
    >
      <v-carousel-item
        v-for="(item, i) in tour?.listImages"
        :key="i"
        :src="item"
        cover
      />
    </v-carousel>
    <v-card
      elevation="10"
      class="toolbar"
    >
      <div class="d-flex align-center flex-wrap ma-4">
        <v-text-field
          label="Email"
          name="Email"
          prepend-inner-icon="mdi-shield-account-outline"
          type="Date"
          :min="minDate"
          color="primary"
          hide-details="auto"
          class="text-field"
          variant="outlined"
        />
        <v-text-field
          label="Password"
          name="password"
          type="Date"
          prepend-inner-icon="mdi-lock-outline"
          color="primary"
          variant="outlined"
          hide-details="auto"
          class="text-field"
        />
        <v-btn>
          Tìm kiếm
        </v-btn>
      </div>
    </v-card>
    <div style="height: 500px;" />
  </v-sheet>
</template>
<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTourUtil } from '@/composables/useTour'

const route = useRoute()
const tourId = route.params.id as string
const { tour, getTourById } = useTourUtil()
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