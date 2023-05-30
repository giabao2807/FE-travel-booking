<template>
  <v-sheet>
    <v-tabs
      color="deep-purple-accent-4"
      align-tabs="center"
    >
      <v-tab :value="1">
        <v-icon class="mr-5" icon="mdi-compass-rose" />
        Tours
      </v-tab>
      <v-tab :value="2">
        <v-icon class="mr-5" icon="mdi-bed-outline" />
        Hotels
      </v-tab>
    </v-tabs>
    <v-window>
      <v-window-item
        v-for="n in 3"
        :key="n"
        :value="n"
      >
        <v-container fluid>
          <div />
        </v-container>
      </v-window-item>
    </v-window>
  </v-sheet>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBookingDialog } from '@/composables/useBookingDialog'

const { messageStatusPayment, callBackPayment } = useBookingDialog()
const route = useRoute()
const query = ref<any>(route.query)
onMounted(() => {
  callBackPayment(query.value)
})
</script>