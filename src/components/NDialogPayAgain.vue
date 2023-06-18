<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-dialog width="70%" @update:modelValue="(event) => hanldeChange(event)">
    <template #activator>
      <slot name="action" />
    </template>
    <template #default="{ isActive }">
      <v-card>
        <v-toolbar class="px-5">
          <v-toolbar-title>
            <h4 class="font-rowdies">
              <v-icon icon="mdi-credit-card-outline" />
              Tiếp Tục Thanh Toán
            </h4>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <n-select-bank v-model="bankCode" />
        </v-card-text>
        <v-card-actions class="my-2 mx-3">
          <v-btn
            class="text-none"
            prepend-icon="mdi-close-outline"
            @click="() => isActive.value = false"
          >
            Đóng
          </v-btn>
          <v-spacer />
          <v-btn
            class="text-none rounded-xl"
            min-width="110"
            color="primary"
            variant="tonal"
            prepend-icon="mdi-cloud-arrow-up-outline"
            @click="() => getAndToPayment({ id: propItems.idBooking, bankCode: bankCode })"
          >
            Payment
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script lang="ts" setup>
import NSelectBank from './NSelectBank.vue'
import { ref, defineEmits, defineProps, withDefaults } from 'vue'
import { useBookStore } from '@/store/booking'

type Props = {
  idBooking: string,
}
const propItems = withDefaults(defineProps<Props>(), {
  idBooking: ''
})

const emit = defineEmits<{
  (event: 'update:modelValue', booking: boolean): void
}>()
const hanldeChange = (event: boolean) => {
  emit('update:modelValue', event)
}
const bookStore = useBookStore()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAndToPayment = (params: any) => {
  bookStore.getPaymentLinkAgain(params)
    .then(data => {
      window.location.href = data.paymentLink
    })
}
const bankCode = ref<string>('')
</script>