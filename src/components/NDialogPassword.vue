<template>
  <v-dialog
    v-model="openDialogChangePass"
    :transition="propItems.transition"
    width="35%"
    :fullscreen="propItems.fullScreen"
  >
    <v-card>
      <v-toolbar color="primary" class="px-5">
        <v-icon icon="mdi-swap-horizontal" />
        <v-toolbar-title>Change Password User</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form
          ref="formRef"
          class="mx-5"
        >
          <v-text-field
            v-model="paramChangePass.oldPassword"
            :rules="[ruleRequired('Old Password')]"
            label="Old Password"
            name="password"
            prepend-inner-icon="mdi-lock-outline"
            color="primary"
            variant="outlined"
            hide-details="auto"
            class="text-field"
            density="compact"
          />
          <v-text-field
            v-model="paramChangePass.newPassword"
            :rules="[ruleRequired('New Password'), ruleLength('New Password', 8)]"
            label="New Password"
            name="password"
            prepend-inner-icon="mdi-lock-outline"
            color="primary"
            variant="outlined"
            hide-details="auto"
            class="text-field"
            density="compact"
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-end pa-2">
        <v-btn
          variant="text"
          class="text-none"
          prependIcon="mdi-close-outline"
          @click="() => {
            openDialogChangePass = false
            resetSearch()
          }"
        >
          Close
        </v-btn>
        <v-spacer />
        <v-btn
          variant="tonal"
          class="text-none"
          color="primary"
          prepend-icon="mdi-swap-horizontal"
          @click="() => {
            changePassword()
          }"
        >
          Change
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
import { useChangePassword } from '@/composables/useChangePassword'
import { validations } from '@/helpers/validate'

type Props = {
  fullScreen?: boolean,
  transition?: string,
}
const propItems = withDefaults(defineProps<Props>(), {
  fullScreen: false,
  transition: 'dialog-top-transition'
})
const { ruleRequired, ruleLength } = validations()
const {
  openDialogChangePass,
  paramChangePass,
  formRef,
  resetSearch,
  changePassword
} = useChangePassword()
</script>