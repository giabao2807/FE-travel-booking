<template>
  <v-container v-if="propItems.loading" class="height-400px">
    <v-row
      class="fill-height"
      align-content="center"
      justify="center"
    >
      <v-col
        class="text-subtitle-1 text-center"
        cols="12"
      >
        Getting data
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
import { defineProps, withDefaults } from 'vue'
type Props = {
  loading: boolean,
}
const propItems = withDefaults(defineProps<Props>(), {
  loading: false
})

console.log(propItems.loading)
</script>

<style scoped>
</style>