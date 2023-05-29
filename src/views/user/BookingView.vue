<template>
  <div>{{ messageStatusPayment }}</div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBooking } from '@/composables/useBooking'

const { messageStatusPayment, callBackPayment } = useBooking()
const route = useRoute()
const query = ref<any>(route.query)
onMounted(() => {
  callBackPayment(query.value)
})
</script>