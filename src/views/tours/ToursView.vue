<template>
  <div>
    <v-row>
      <v-col v-for="item in tours?.results" :key="item?.id">
        <v-card>
          <v-card-text>
            {{ item }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-pagination
      v-if="tours?.results"
      :total-visible="5"
      :length="tours?.pageNumber"
    />
  </div>
</template>
<script lang="ts" setup>
import { useTourUtil } from '@/composables/useTour'

const { tours } = useTourUtil()
console.log(tours.value)

</script>