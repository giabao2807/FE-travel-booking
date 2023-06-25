<template>
  <v-dialog
    :transition="propItems.transition"
    :width="propItems.width"
    :fullscreen="propItems.fullScreen"
    @update:modelValue="(event) => hanldeChange(event)"
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
        <v-card-actions class="justify-end pa-2">
          <v-btn
            v-if="!propItems.oneBtn"
            variant="text"
            :prepend-icon="propItems.prependIconOne"
            class="text-none"
            @click="isActive.value = handleAction('action-one')"
          >
            {{ propItems.labelBtnOne }}
          </v-btn>
          <v-btn
            variant="text"
            class="text-none"
            :prepend-icon="propItems.prependIconSecond"
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
  textDialog?: string,
  title?: string,
  labelBtnOne?: string,
  prependIconOne?: string,
  labelBtnSecond?: string,
  prependIconSecond?: string,
  iconToolBar?: string,
  width?: string,
  fullScreen?: boolean,
  transition?: string,
  oneBtn?: boolean
}
const emit = defineEmits(['update:modelValue', 'action-one', 'action-second'])
const hanldeChange = (event: boolean) => {
  emit('update:modelValue', event)
}
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
  transition: 'dialog-top-transition',
  oneBtn: false,
  prependIconOne: '',
  prependIconSecond: ''
})
</script>