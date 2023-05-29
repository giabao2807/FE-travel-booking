<template>
  <v-dialog
    :transition="propItems.transition"
    :width="propItems.width"
    :fullscreen="propItems.fullScreen"
  >
    <template #activator="{ props }">
      <a v-bind="props">
        <slot name="btnDialog" />
      </a>
    </template>
    <template #default="{ isActive }">
      <v-card class="rounded-xl">
        <v-toolbar class="px-5">
          <v-icon v-if="propItems.iconToolBar" :icon="propItems.iconToolBar" />
          <v-toolbar-title>{{ propItems.title }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <slot name="content" />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            variant="text"
            @click="isActive.value = handleAction('action-one')"
          >
            {{ propItems.labelBtnOne }}
          </v-btn>
          <v-btn
            variant="text"
            @click="isActive.value = handleAction('action-second')"
          >
            {{ propItems.labelBtnSecond }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, withDefaults } from 'vue'
type Props = {
  textDialog: string,
  title: string,
  labelBtnOne: string,
  labelBtnSecond: string,
  iconToolBar?: string,
  width: string,
  fullScreen: boolean,
  transition: string
}
const emit = defineEmits(['action-one', 'action-second'])
const handleAction = (action: 'action-one'|'action-second') => {
  emit(action)
  return false
}
const propItems = withDefaults(defineProps<Props>(), {
  textDialog: '',
  title: '',
  labelBtnOne: 'cancel',
  labelBtnSecond: 'submit',
  iconToolBar: '',
  width: '',
  fullScreen: false,
  transition: 'dialog-top-transition'
})
</script>