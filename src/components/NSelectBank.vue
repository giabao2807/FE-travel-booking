<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-container class="height-400px overflow-y-auto">
    <v-row class="mx-2">
      <v-col cols="3" v-for="item in BANK" :key="item.value">
        <v-card
          :class="selectBank === item.value ? 'bg-primary' : ''"
          height="80"
          width="200"
          @click="() => hanldeChange(item.value)"
        >
          <v-card-text align="center">
            <n-image
              width="100"
              :src="item.image"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import NImage from '@/components/NImage.vue'
import { BANK } from '@/resources/mockData'
import { ref, defineEmits } from 'vue'


const selectBank = ref<string>()
const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()
const hanldeChange = (event: string) => {
  selectBank.value = event
  emit('update:modelValue', event)
}
</script>