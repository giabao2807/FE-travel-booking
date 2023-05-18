<template>
  <v-row v-if="propItems.loading">
    <v-col md="3" v-for="item in propItems.quantity" :key="item">
      <v-skeleton-loader
        :loading="propItems.loading"
        :height="propItems.height"
        class="ma-2"
        type="image, list-item-two-line"
      >
        <v-responsive>
          <slot name="content" />
        </v-responsive>
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
type Props = {
  loading: boolean,
  quantity: number,
  height?: string
}
const propItems = withDefaults(defineProps<Props>(), {
  loading: true,
  quantity: 1,
  height: '300'
})
</script>