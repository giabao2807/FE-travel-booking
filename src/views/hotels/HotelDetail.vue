<template>
  <v-sheet class="container-detail">
    <v-sheet>
      <v-carousel
        class="carousel"
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
      </v-carousel>
      <v-card
        elevation="10"
        class="toolbar"
      >
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
      </v-card>
    </v-sheet>
    <v-sheet color="transparent" class="mx-5 mt-20">
      <h1 class="title">{{ hotel?.name }}</h1>
      <span v-html="hotel?.descriptions" />
    </v-sheet>
  </v-sheet>
</template>
<script lang="ts" setup>
import { useHotelUtil } from '@/composables/useHotel'
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const hotelId = route.params.id as string
const { hotel, roomTypes, getHotelById } = useHotelUtil()
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
  width: 200px;

}
.btn-shadown {
  color: #fff;
  font-weight: 600;
}
.btn-shadown:hover {
  box-shadow: #ec488c 0px 0px 0px 6px;
}
</style>