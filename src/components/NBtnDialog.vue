<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <v-dialog
    transition="dialog-top-transition"
    width="28%"
  >
    <template #activator="{ props }">
      <v-btn
        variant="plain"
        :color="propItems.color"
        :icon="propItems.icon"
        v-bind="props"
      />
    </template>
    <template #default="{ isActive }">
      <v-card>
        <v-toolbar
          :color="propItems.color"
        >
          <v-toolbar-title class="text-center">
            <v-icon icon="mdi-clipboard-alert-outline" class="mr-2" />
            <strong>{{ propItems.title }}</strong>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text class="text-center" style="min-height: 80px;">
          {{ propItems.message }}
        </v-card-text>
        <v-divider class="mt-5 mb-2 mx-5" />
        <v-card-actions class="justify-end">
          <v-btn
            variant="text"
            prepend-icon="mdi-close-outline"
            class="text-none"
            @click="isActive.value = false"
          >
            Close
          </v-btn>
          <v-spacer />
          <v-btn
            variant="tonal"
            :color="propItems.color"
            prepend-icon="mdi-gesture-tap"
            class="text-none rounded-xl"
            @click="() => {
              isActive.value = false
              handleAction()
            }"
          >
            {{ propItems.titleBtn }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits } from 'vue'

type Props = {
  color?: string,
  icon?: string,
  title?: string,
  titleBtn?: string,
  message?: string
}
const propItems = withDefaults(defineProps < Props > (), {
  color: '#000',
  icon: '',
  title: '',
  message: '',
  titleBtn: 'Confirm'
})
const emit = defineEmits(['actionDialog'])
const handleAction = () => {
  emit('actionDialog')
}
</script>