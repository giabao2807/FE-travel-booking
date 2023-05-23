<template>
  <div>
    <v-row>
      <v-col v-for="item in hotels" :key="item?.id">
        <v-card>
          <v-card-text>
            {{ item }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts" setup>
import { useHotelUtil } from '@/composables/useHotel'

const { hotels } = useHotelUtil()
</script>