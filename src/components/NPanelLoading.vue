<template>
  <v-container v-if="loading" class="height-400px">
    <v-row
      class="fill-height"
      align-content="center"
      justify="center"
    >
      <v-col
        class="text-subtitle-1 text-center"
        cols="12"
      >
        Getting your files
      </v-col>
      <v-col cols="6">
        <v-progress-linear
          color="deep-purple-accent-4"
          indeterminate
          rounded
          height="10"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import { usePanelLoading } from '@/composables/usePanelLoading'
const { loading } = usePanelLoading()
</script>

<style scoped>
</style>