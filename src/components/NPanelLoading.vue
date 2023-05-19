<template>
  <v-container
    v-if="propItems.loading"
  >
    <v-row
      class="fill-height"
      align-content="center"
      justify="center"
    >
      <v-col
        class="text-subtitle-1 text-center"
        cols="12"
      >
        <strong>Getting data</strong>
      </v-col>
      <v-col cols="2">
        <v-progress-linear
          color="primary"
          indeterminate
          rounded
          height="15"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
type Props = {
  loading: boolean,
  width: string,
  height: string,
}
const propItems = withDefaults(defineProps<Props>(), {
  loading: false,
  width: '80px',
  height: '200px'
})
</script>

<style scoped>
</style>