<template>
  <v-sheet class="container-detail">
    <v-sheet>
      <v-sheet>
        <v-img :src="hotel?.coverPicture" cover height="500" aspect-ratio="16/9">
          <template #default>
            <v-row
              class="fill-height ma-0"
              align="start"
              justify="center"
            >
              <h1 class="heading-primary">
                <span class="heading-primary--main">{{ hotel?.name }}</span>
              </h1>
            </v-row>
          </template>
        </v-img>
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
          <v-card :title="room?.name" variant="outlined">
            <v-card-actions>
              <v-btn>Click me</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
    <v-sheet color="transparent" class="mx-5 description">
      <div class="foo" v-html="hotel?.descriptions" />
      <div v-html="hotel?.rules" />
    </v-sheet>
  </v-sheet>
</template>
<script lang="ts" setup>
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

.toolbar {
  width: 60%;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}
.description {
  margin-top: 8rem;
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
::v-deep .htdt-policy,::v-deep .htdt-description {
  background-color: transparent !important;
}
</style>